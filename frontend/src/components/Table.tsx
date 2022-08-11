import { useEffect } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from "react-table";

// Icons
import {
  SwitchVerticalIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/outline";

// Component
import TablePagination from "./TablePagination";

function Table(props: { columns: any; list: Array<any>; search: string, sortBy?: Array<any> }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows, // for non pagination
    prepareRow,
    setGlobalFilter,
    page,
    // pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: props.columns,
      data: props.list,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        hiddenColumns: props.columns
          .filter((column: { show: boolean }) => {
            return column.show === false;
          })
          .map((column: { id: string }) => {
            return column.id;
          }),
        sortBy: props.sortBy ?? []
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setGlobalFilter(props.search);
  }, [props.search, setGlobalFilter]);

  return (
    <>
      <TablePagination
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageCount={pageCount}
        pageSize={pageSize}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        gotoPage={(page) => {
          gotoPage(page);
        }}
        previousPage={() => {
          previousPage();
        }}
        nextPage={() => {
          nextPage();
        }}
        setPageSize={(pageSize) => {
          setPageSize(pageSize);
        }}
      />
      <table {...getTableProps()} className="w-full mt-2">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={"border bg-slate-800 text-white py-1 font-normal " + column.classHeader}
                >
                  <div className={(column.classDivHeader ?? "")}>
                    {column.render("Header")}
                    {!column.disableSortBy && (
                      <span className="ml-auto h-full flex align-middle">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <SortDescendingIcon className="w-6 px-1" />
                          ) : (
                            <SortAscendingIcon className="w-6 px-1" />
                          )
                        ) : (
                          <SwitchVerticalIcon className="w-6 px-1" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border">
                {row.cells.map((cell) => {
                  const classTd = cell.column.className ? ` ${cell.column.className}` : "";
                  return (
                    <td {...cell.getCellProps()} className={"px-2 border" + classTd}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;