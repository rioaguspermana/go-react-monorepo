import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

function TablePagination(props: {
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  pageSize: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
}) {
  return (
    <div className="flex mt-2 items-center justify-between">
      <div className="flex flex-row space-x-1">
        <button
          onClick={() => props.gotoPage(0)}
          disabled={!props.canPreviousPage}
          className="bg-blue-500 disabled:bg-gray-300 rounded flex justify-center items-center"
        >
          <ChevronDoubleLeftIcon className="w-8 h-8 p-1 stroke-white" aria-hidden="true" />
        </button>
        <button
          onClick={() => props.previousPage()}
          disabled={!props.canPreviousPage}
          className="bg-blue-500 disabled:bg-gray-300 rounded flex justify-center items-center"
        >
          <ChevronLeftIcon className="w-8 h-8 p-1 stroke-white" aria-hidden="true" />
        </button>
        <button
          onClick={() => props.nextPage()}
          disabled={!props.canNextPage}
          className="bg-blue-500 disabled:bg-gray-300 rounded flex justify-center items-center"
        >
          <ChevronRightIcon className="w-8 h-8 p-1 stroke-white" aria-hidden="true" />
        </button>
        <button
          onClick={() => props.gotoPage(props.pageCount - 1)}
          disabled={!props.canNextPage}
          className="bg-blue-500 disabled:bg-gray-300 rounded flex justify-center items-center"
        >
          <ChevronDoubleRightIcon className="w-8 h-8 p-1 stroke-white" aria-hidden="true" />
        </button>
      </div>
      <span>
        Page :{" "}
        <strong>
          {props.pageIndex + 1} of {props.pageOptions.length}
        </strong>
      </span>
      <span className="hidden md:block">
        Go to page :{" "}
        <input
          type="number"
          defaultValue={props.pageIndex + 1}
          className="px-2 py-1 border rounded"
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            props.gotoPage(page);
          }}
          style={{ width: "100px" }}
        />
      </span>
      <select
        value={props.pageSize}
        className="hidden md:block px-2 py-1 border rounded"
        onChange={(e) => {
          props.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TablePagination;
