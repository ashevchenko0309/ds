import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Connection, ConnectionsResponse } from "../../shared/models/connections.ts";
import { CONNECTIONS_ENDPOINTS } from "../../shared/api/endpoints/connections.ts";
import { apiInstance } from "../../shared/api/axiosInstance.ts";
import BaseTable from "../../components/Tables/BaseTable";
import { useMemo } from "react";
import useBaseTableState from "../../shared/hooks/table/useBaseTableState.ts";
import { ColumnDef, TableState } from "@tanstack/react-table";

const columns: ColumnDef<Connection>[] = [
  {
    header: "Connection name",
    accessorKey: 'name'
  },
  {
    header: "Connection type",
    accessorKey: 'type'
  },
  {
    header: "status",
    accessorKey: 'status'
  },
  {
    header: "actions",
    cell: () => {
      return <button>action one</button>
    }
  }
]

const ConnectionsModule = () => {
  const { pagination, setPagination } = useBaseTableState();
  const { data, isFetching } = useQuery<AxiosResponse<ConnectionsResponse>, AxiosError, ConnectionsResponse>({
    queryKey: [CONNECTIONS_ENDPOINTS.root],
    queryFn: () => apiInstance.get(CONNECTIONS_ENDPOINTS.root),
    select: (response) => response.data,
  });

  const tableState = useMemo<Partial<TableState>>(
    () => ({
      pagination,
    }),
    [pagination]
  );

  const tableData = data?.items ?? [];
  const isEmpty = !isFetching && data?.total === 0;

  return (
    <div>
      <BaseTable<Connection>
        columns={columns}
        state={tableState}
        onPaginationChange={setPagination}
        data={tableData}
        isEmpty={isEmpty}
        isFetching={isFetching}
      />
    </div>
  );
};

export default ConnectionsModule;
