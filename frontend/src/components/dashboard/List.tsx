import { Link } from "react-router-dom";
import { useCallback, useContext, useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";

// Icons
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, ClockIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";

// Context
import SnackbarContext from "../../context/SnackbarContext";
import LoaderContext from "../../context/LoaderContext";

// Helper
import errorHandler from "../../helper/errorHandler";
import logRender from "../../helper/logRender";

// Controller
import TaskController from "../../controller/task";

// Component
import TableFilter from "../TableFilter";
import Table from "../Table";

function List() {
  const { setMessage } = useContext(LoaderContext);
  const { setNotif } = useContext(SnackbarContext);
  const [list, setList] = useState<Array<TTask>>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    logRender({ type: "page", name: "task/List" });
  }, []);

  const getList = useCallback(async () => {
    try {
      setMessage("Fetch Employee");
      const tc = new TaskController();
      const res = await tc.list();
      setList(res.data.list);
      setMessage("");
    } catch (error) {
      setMessage("");
      const errorMessage = errorHandler(error);
      setNotif({ type: "error", message: errorMessage });
    }
  }, [setNotif, setMessage]);

  useEffect(() => {
    getList();
  }, [getList]);

  const handleDeleteList = (id: number) => {
    const arrFilter = [...list].filter((v) => v.id !== id);
    setList(arrFilter);
  };

  return (
    <div className="w-full flex flex-col space-y-0.5">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <Link
          to={`/task/create`}
          className="block w-auto mb-2 md:m-0 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded font-semibold text-sm"
        >
          <div className="flex">
            <PencilIcon className="w-5 h-5 mr-2 stroke-white fill-tranparent" aria-hidden="true" />
            Create
          </div>
        </Link>
        <div className="w-full md:w-auto ml-auto flex">
          <TableFilter search={setSearch} />
        </div>
      </div>
      <div>
        <TaskList list={list} handleDeleteList={handleDeleteList} search={search} />
      </div>
    </div>
  );
}

function TaskList(props: { list: Array<TTask>; handleDeleteList: (id: number) => void; search: string }) {
  const setNotif = useContext(SnackbarContext).setNotif;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const confirmDelete = useCallback(
    async (task: TTask) => {
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
          props.handleDeleteList(task.id);
          setNotif({ type: "success", message: "Employee deleted" });
        }
      } catch (error) {
        const errorMessage = errorHandler(error);
        setNotif({ type: "error", message: errorMessage });
      }
    },
    [props, setNotif]
  );

  const columns = useMemo(
    () => [
      {
        id: "mobile",
        Header: "Employee",
        accessor: "task_name",
        show: isMobile,
        Cell: (props: { row: { original: TTask } }) => {
          return (
            <Link to={`${props.row.original.id}`} className="text-blue-500 hover:text-blue-800">
              {props.row.original.task_name || "NULL"}
            </Link>
          );
        },
      },
      {
        id: "task",
        classHeader: "text-left px-2",
        Header: "Task Name",
        classDivHeader: "flex items-center",
        accessor: "task_name",
        show: !isMobile,
        Cell: (props: { row: { original: TTask } }) => {
          return (
            <Link to={`/task/${props.row.original.id}`} className="text-blue-500 hover:text-blue-800">
              {props.row.original.task_name || "NULL"}
            </Link>
          );
        },
      },
      {
        id: "deadline",
        classHeader: "text-left px-2",
        Header: "Deadline",
        classDivHeader: "flex items-center",
        accessor: "deadline",
        show: !isMobile,
        Cell: (props: { row: { original: TTask } }) => {
          return <span className="font-semibold text-sm">{new Date(props.row.original.deadline).toLocaleString()}</span>;
        },
      },
      {
        id: "status",
        classHeader: "text-left px-2",
        Header: "Status",
        classDivHeader: "flex items-center",
        accessor: "status",
        show: !isMobile,
        Cell: (props: { row: { original: TTask } }) => {
          let statusContent = {
            icon: <QuestionMarkCircleIcon className="w-4 text-gray-600" />,
            text: <span className="font-semibold text-sm text-gray-600">Unknown</span>
          }
          if (props.row.original.status === "true") {
            statusContent = {
              icon: <CheckCircleIcon className="w-4 text-green-600" />,
              text: <span className="font-semibold text-sm text-green-600">Completed</span>
            }
          } else if (props.row.original.status === "false") {
            statusContent = {
              icon: <ClockIcon className="w-4 text-red-600" />,
              text: <span className="font-semibold text-sm text-red-600">Incomplete</span>
            }
          }
          return <div className="flex space-x-1">
            {statusContent.icon}
            {statusContent.text}
          </div>;
        },
      },
      {
        id: "assign_to",
        classHeader: "text-left px-2",
        Header: "Assign to",
        classDivHeader: "flex items-center",
        accessor: "employee",
        show: !isMobile,
        Cell: (props: { row: { original: TTask } }) => {
          if (props.row.original.employee?.employee_name === null) {
            return <span>-</span>;
          } else {
            return <Link to={`/employee/${props.row.original.employee?.id}`} className="text-blue-500 hover:text-blue-800">
              {props.row.original.employee?.employee_name}
            </Link>;
          }
        },
      },
      {
        id: "action_delete",
        classHeader: "w-[30px] text-white",
        Header: () => {
          return <TrashIcon className="h-5 w-auto" />;
        },
        classDivHeader: "flex justify-center",
        accessor: "id",
        show: !isMobile,
        disableSortBy: true,
        className: "text-white bg-red-500 hover:bg-red-800",
        Cell: (props: { row: { original: TTask } }) => {
          return (
            <button className="flex justify-center" onClick={() => confirmDelete(props.row.original)}>
              <TrashIcon className="h-5" />
            </button>
          );
        },
      },
    ],
    [isMobile, confirmDelete]
  );

  const sortBy = [
    {
      id: 'deadline',
      desc: true
    }
  ]

  return <Table columns={columns} list={props.list} search={props.search} sortBy={sortBy} />;
}

export default List;
