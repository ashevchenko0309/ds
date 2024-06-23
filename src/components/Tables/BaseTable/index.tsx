import {
  ColumnDef,
  OnChangeFn,
  TableState,
  PaginationState,
  getCoreRowModel,
  RowData,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/uiKit/ui/table.tsx";
import { Loader2 } from "lucide-react";
import { Button } from "~/components/uiKit/ui/button.tsx";
import { cn } from "~/lib/uiKit/utils.ts";

interface BaseTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  state: Partial<TableState>;
  isFetching: boolean;
  isEmpty: boolean;
  isPagination?: boolean;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

const BaseTable = <TData extends RowData>({
  data,
  state,
  columns,
  isFetching,
  isEmpty,
  isPagination = true,
  onPaginationChange,
}: BaseTableProps<TData>) => {
  const rowCount = data.length;

  const table = useReactTable({
    data,
    columns,
    // pageCount: dataQuery.data?.pageCount ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
    rowCount, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
    state,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="rounded-md border">
        <div className="rounded-md shadow-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    console.log(header.column.columnDef);
                    return (
                      <TableHead className={cn('px-6', header.column.columnDef.meta?.className ?? '')} key={header.id}>
                        <div className="h3 text-black">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={cn("px-6 text-md text-black")}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {isEmpty && "No results."}
                    {isFetching && <Loader2 className="animate-spin" />}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {isPagination ? (
        <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
          {"<<"}
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button size="icon" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {">"}
        </Button>
        <Button size="icon" variant="outline" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
          {">>"}
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        </div>
      ): <></>}
    </div>
  );
};

export default BaseTable;
