import { ColumnDef } from "@tanstack/react-table";

export type ExtendedColumnDef<TData> = ColumnDef<TData, unknown> & {
  className?: string;
};
