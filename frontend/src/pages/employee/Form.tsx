import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
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

// Component
import BackButton from "../../components/BackButton";

const schema = yup.object().shape({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value)),
  employee_name: yup
    .string()
    .label("Employee Name")
    .transform((value) => (value === null ? "" : value))
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

  // state document
  const [doc, setDoc] = useState<TEmployee>({
    id: 0,
    employee_name: "",
  });

  // check is form create
  const isCreate = paramId === "create";

  // react hook form initialize
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TEmployee>({ resolver: yupResolver(schema) });

  // use effect on load just for check state
  useEffect(() => {
    logRender({ type: "page", name: "employee/Form" });
  }, []);

  // initial function get document
  const getDoc = useCallback(
    async function getDoc() {
      try {
        // fetch document
        if (!isCreate) {
          setMessage("Fetch Document");
          const ec = new EmployeeController();
          const res = await ec.get(parseInt(paramId));
          const row: TEmployee = res.data.row;
          setDoc(row);
          setValue("id", row.id);
          setValue("employee_name", row.employee_name);
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

  // action on submit trigger from react-hook-form
  const onSubmit: SubmitHandler<TEmployee> = async (data) => {
    try {
      setMessage("Save Employee");
      const ec = new EmployeeController();
      let res
      if (isCreate) {
        res = await ec.create(data);
      } else {
        res = await ec.update(data);
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
  const confirmDelete = async (employee: TEmployee) => {
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
        const ec = new EmployeeController();
        await ec.delete(employee.id);
        setNotif({ type: "success", message: "Employee deleted" });
        navigate(`../`, { replace: true });
      }
    } catch (error) {
      const errorMessage = errorHandler(error);
      setNotif({ type: "error", message: errorMessage });
    }
  };

  // return masin component
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
                <span>Employee</span>
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
                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Employee Name
                        </label>
                        <input
                          className={
                            (errors?.employee_name ? "border-red-500" : "border-gray-200 focus:border-gray-500") +
                            " first-letter:appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 focus:outline-none focus:bg-white disabled:text-gray-500"
                          }
                          autoFocus={true}
                          {...register("employee_name")}
                        />
                        {errors.employee_name && (
                          <p className="text-red-500 text-xs italic">{errors.employee_name.message}</p>
                        )}
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
