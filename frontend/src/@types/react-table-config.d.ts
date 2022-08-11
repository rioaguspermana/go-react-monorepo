import {
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table'

declare module 'react-table' {
  export interface TableInstance<D extends object = {}>
    extends Omit<TableOptions<D>, 'columns' | 'pageCount'>,
      UseTableInstanceProps<D> {
        canPreviousPage: boolean;
        canNextPage: boolean;
        pageCount: number;
        pageOptions: number[];
        gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
        nextPage: () => void;
        previousPage: () => void;
        setPageSize: (pageSize: number) => void;
      }
      
  export interface TableState<D extends object = {}> {
    sortBy: Array<any>
  }

  export interface UseTableInstanceProps<D extends object = {}>
    extends UseGlobalFiltersInstanceProps<D> {}

  export interface ColumnInstance<D extends object = {}>
    extends Omit<ColumnInterface<D>, 'id'>,
      ColumnInterfaceBasedOnValue<D>,
      UseTableColumnProps<D> {
        getSortByToggleProps: (props?: Partial<TableSortByToggleProps>) => TableSortByToggleProps;
        isSorted: boolean,
        isSortedDesc: boolean
        disableSortBy: boolean
        classHeader?: string
        classDivHeader?: string
      }
  export interface ColumnInstance<D extends object = {}>
    extends Omit<ColumnInterface<D>, 'id'>,
      ColumnInterfaceBasedOnValue<D>,
      UseTableColumnProps<D> {
        className?: string
      }

  export interface TableOptions<D extends Record<string, unknown>> extends
    UsePaginationOptions<D>,
    Record<string, any> {}

  export interface TableState<D extends Record<string, unknwon> = Record<string, unknonw>> extends
    UsePaginationState<D> {}

  export interface TableInstance<D extends Record<string, unknwon> = Record<string, unknonw>> extends
    UsePaginationInstanceProps<D> {}
}