import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure, Transition, Switch } from "@headlessui/react";
import CreatableSelect from "react-select/creatable";
import Swal from "sweetalert2";

// Icons
import { SaveIcon, TrashIcon, ChevronUpIcon } from "@heroicons/react/outline";

// Context
import LoaderContext from "../../context/LoaderContext";
import SnackbarContext from "../../context/SnackbarContext";

// Helper
import errorHandler from "../../helper/errorHandler";
import logRender from "../../helper/logRender";

// Controller
import EmployeeController from "../../controller/employee";
import TaskController from "../../controller/task";

// Component
import BackButton from "../../components/BackButton";

const schema = yup.object().shape({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value)),
  task_name: yup
    .string()
    .label("Task Name")
    .transform((value) => (value === null ? "" : value))
    .required(),
  deadline: yup
    .string()
    .label("Deadline")
    .transform((value) => (value === null ? "" : value))
    .required(),
  status: yup.string().label("Roles").required().default("false").oneOf(["false", "true"]),
  employee_id: yup
    .number()
    .label("Employee")
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(),
});

function Form() {
  const { setMessage } = useContext(LoaderContext);
  const { setNotif } = useContext(SnackbarContext);

  // use navigate
  const navigate = useNavigate();

  /**
   * parse param id
   */
  // get location
  const location = useLocation();
  // remove trailing slash in production when reload/refresh
  const arrPath = location.pathname.replace(/\/$/, "").split("/");
  const paramId = arrPath[arrPath.length - 1];

  // required value state
  const [employeeOptions, setEmployeeOptions] = useState<TSelect[]>([]);
  const [employeeSelected, setEmployeeSelected] = useState<TSelect | null>(null);

  // helper
  const [isDone, setIsDone] = useState<boolean>(false);
  const [loadingNewEmployee, setLoadingNewEmployee] = useState<boolean>(false)

  // state document
  const [doc, setDoc] = useState<TTask>({
    id: 0,
    task_name: "",
    deadline: "",
    status: "false",
    employee_id: 0
  });

  // check is form create
  const isCreate = paramId === "create";

  // react hook form initialize
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TTask>({ resolver: yupResolver(schema) });

  // use effect on load just for check state
  useEffect(() => {
    logRender({ type: "page", name: "task/Form" });
  }, []);

  // initial function get document
  const getDoc = useCallback(
    async function getDoc() {
      try {
        // fetch option employee
        setMessage("Fetch Employee");
        const ec = new EmployeeController();
        const res = await ec.list();
        const toSelect: TSelect[] = res.data.list.map((v: TEmployee) => {
          return { id: v.id, value: v.id, label: v.employee_name };
        });
        setEmployeeOptions(toSelect);

        // fetch document
        if (!isCreate) {
          setMessage("Fetch Document");
          const tc = new TaskController();
          const res = await tc.get(parseInt(paramId));
          const row: TTask = res.data.row;
          setDoc(row);
          setValue("id", row.id);
          setValue("task_name", row.task_name);
          setValue("deadline", row.deadline);
          setValue("status", row.status);
          setValue("employee_id", row.employee_id);
          setIsDone(row.status === "true");
          if (row.employee_id !== null) {
            setEmployeeSelected({ id: row.employee_id, value: row.employee_id.toString(), label: (row.employee?.employee_name ?? "") });
          }
        }
        setMessage("");
      } catch (error) {
        setMessage("");
        const errorMessage = errorHandler(error);
        setNotif({ type: "error", message: errorMessage });
        navigate(`../`, { replace: true });
      }
    },
    [setValue, paramId, isCreate, setNotif, setMessage, navigate]
  );

  // use effect on load for call initial function
  useEffect(() => {
    getDoc();
  }, [getDoc]);

  // use effect for is done toggle
  useEffect(() => {
    setValue("status", isDone ? "true" : "false");
  }, [setValue, isDone]);

  // action on submit trigger from react-hook-form
  const onSubmit: SubmitHandler<TTask> = async (data) => {
    try {
      setMessage("Save Task");
      const tc = new TaskController();
      let res
      if (isCreate) {
        res = await tc.create(data);
      } else {
        res = await tc.update(data);
      }
      setNotif({ type: "success", message: res.data.message });
      setMessage("");
      navigate(`../`, { replace: true });
    } catch (error) {
      setMessage("");
      const errorMessage = errorHandler(error);
      setNotif({ type: "error", message: errorMessage });
    }
  };

  // delete confirmation
  const confirmDelete = async (task: TTask) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirm.isConfirmed) {
        const tc = new TaskController();
        await tc.delete(task.id);
        setNotif({ type: "success", message: "Task deleted" });
        navigate(`../`, { replace: true });
      }
    } catch (error) {
      const errorMessage = errorHandler(error);
      setNotif({ type: "error", message: errorMessage });
    }
  };

  // handle create employee
  const handleCreateEmployee = async (newEmployee: string) => {
    try {
      // set loading select 
      setLoadingNewEmployee(true)
      setMessage("Create Employee");
      const ec = new EmployeeController();
      const res = await ec.create({ id: 0, employee_name: newEmployee });
      // new employee as select
      const createdEmployee: TSelect = { id: res.data.id, value: res.data.id, label: newEmployee }
      // append new select
      const newEmployeeOptions = [...employeeOptions, createdEmployee]
      // set to state
      setEmployeeOptions(newEmployeeOptions)
      // set selected
      setEmployeeSelected(createdEmployee)
      // set form react hook value
      setValue("employee_id", parseInt(res.data.id));
      setNotif({ type: "success", message: res.data.message });
      setMessage("");
      setLoadingNewEmployee(false)
    } catch (error) {
      setMessage("");
      setLoadingNewEmployee(false)
      const errorMessage = errorHandler(error);
      setNotif({ type: "error", message: errorMessage });
    }
  }

  // return main component
  return (
    <div className="w-full flex flex-col space-y-0.5">
      <div className="flex">
        <BackButton />
        <button
          onClick={handleSubmit(onSubmit)}
          className="mx-2 block w-auto px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded font-semibold text-sm"
        >
          <div className="flex">
            <SaveIcon className="w-5 h-5 mr-2 stroke-white fill-tranparent" aria-hidden="true" />
            Save
          </div>
        </button>
        {!isCreate && (
          <button
            onClick={() => confirmDelete(doc)}
            className="ml-auto block w-auto px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded font-semibold text-sm"
          >
            <div className="flex">
              <TrashIcon className="w-5 h-5 mr-2 stroke-white fill-tranparent" aria-hidden="true" />
              Delete
            </div>
          </button>
        )}
      </div>
      {/* MAIN SECTION */}
      <div className="pt-4">
        {/* Main Form */}
        <Disclosure defaultOpen={true} as="div" className="pb-1">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-sm font-medium text-left text-gray-100 bg-gray-900 rounded hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Task</span>
                <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-100`} />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  <form className="w-full">
                    <div className="flex flex-wrap -mx-3">
                      <input {...register("id")} type="number" className="hidden" />

                      {/** Task Name Field */}
                      <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Task Name
                        </label>
                        <input
                          className={
                            (errors?.task_name ? "border-red-500" : "border-gray-200 focus:border-gray-500") +
                            " first-letter:appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 focus:outline-none focus:bg-white disabled:text-gray-500"
                          }
                          autoFocus={true}
                          {...register("task_name")}
                        />
                        {errors.task_name && (
                          <p className="text-red-500 text-xs italic">{errors.task_name.message}</p>
                        )}
                      </div>

                      <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Deadline
                        </label>
                        <input
                          type="datetime-local"
                          className={
                            (errors?.deadline ? "border-red-500" : "border-gray-200 focus:border-gray-500") +
                            " first-letter:appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 focus:outline-none focus:bg-white disabled:text-gray-500"
                          }
                          {...register("deadline")}
                        />
                        {errors.deadline && (
                          <p className="text-red-500 text-xs italic">{errors.deadline.message}</p>
                        )}
                      </div>

                      <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Status
                          <i className={`ml-2 font-medium normal-case ${isDone ? "text-green-700" : "text-red-500"}`}>
                            ({isDone ? "Completed" : "Incomplete"})
                          </i>
                        </label>
                        <div className="flex">
                          <Switch
                            checked={isDone}
                            onChange={setIsDone}
                            className={`${isDone ? "bg-green-700" : "bg-red-500"
                              } relative inline-flex flex-shrink-0 h-[25px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={`${isDone ? "translate-x-7" : "translate-x-0"
                                } pointer-events-none inline-block h-[21px] w-[28px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                            />
                          </Switch>
                        </div>
                        {errors.status && <p className="text-red-500 text-xs italic">{errors.status.message}</p>}
                      </div>

                      <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Employee
                        </label>
                        <div>
                          <CreatableSelect
                            placeholder="Select Employee"
                            className="bg-gray-200"
                            styles={{
                              control: (provided: Record<string, unknown>, state: any) => ({
                                ...provided,
                                borderColor: errors.employee_id ? "rgb(239 68 68 / 1)" : "rgb(229 231 235 / 1)",
                                backgroundColor: state.isFocused ? "white" : "#e5e7eb"
                              }),
                            }}
                            value={employeeSelected}
                            options={employeeOptions}
                            onChange={(v, _) => {
                              if (v?.value !== undefined) {
                                setEmployeeSelected(v);
                                setValue("employee_id", parseInt(v.value));
                              }
                            }}
                            isLoading={loadingNewEmployee}
                            onCreateOption={handleCreateEmployee}
                          />
                          {errors.employee_id && <p className="text-red-500 text-xs italic">{errors.employee_id.message}</p>}
                        </div>
                      </div>

                    </div>
                  </form>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default Form;
