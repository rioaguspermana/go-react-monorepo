import { Link } from "react-router-dom";
import { useCallback, useContext, useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";

// Icons
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

// Context
import SnackbarContext from "../../context/SnackbarContext";
import LoaderContext from "../../context/LoaderContext";

// Helper
import errorHandler from "../../helper/errorHandler";
import logRender from "../../helper/logRender";

// Controller
import EmployeeController from "../../controller/employee";

// Component
import TableFilter from "../../components/TableFilter";
import Table from "../../components/Table";

function List() {
  const { setMessage } = useContext(LoaderContext);
  const { setNotif } = useContext(SnackbarContext);
  const [list, setList] = useState<Array<TEmployee>>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    logRender({ type: "page", name: "employee/List" });
  }, []);

  const getList = useCallback(async () => {
    try {
      setMessage("Fetch Employee");
      const ec = new EmployeeController();
      const res = await ec.list();
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
          to={`create`}
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
        <EmployeeList list={list} handleDeleteList={handleDeleteList} search={search} />
      </div>
    </div>
  );
}

function EmployeeList(props: { list: Array<TEmployee>; handleDeleteList: (id: number) => void; search: string }) {
  const setNotif = useContext(SnackbarContext).setNotif;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const confirmDelete = useCallback(
    async (employee: TEmployee) => {
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
          props.handleDeleteList(employee.id);
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
        accessor: "employee_name",
        show: isMobile,
        Cell: (props: { row: { original: TEmployee } }) => {
          return (
            <Link to={`${props.row.original.id}`} className="text-blue-500 hover:text-blue-800">
              {props.row.original.employee_name || "NULL"}
            </Link>
          );
        },
      },
      {
        id: "employee",
        classHeader: "text-left px-2",
        Header: "Employee",
        classDivHeader: "flex items-center",
        accessor: "employee_name",
        show: !isMobile,
        Cell: (props: { row: { original: TEmployee } }) => {
          return (
            <Link to={`${props.row.original.id}`} className="text-blue-500 hover:text-blue-800">
              {props.row.original.employee_name || "NULL"}
            </Link>
          );
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
        Cell: (props: { row: { original: TEmployee } }) => {
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

  return <Table columns={columns} list={props.list} search={props.search} />;
}

export default List;
