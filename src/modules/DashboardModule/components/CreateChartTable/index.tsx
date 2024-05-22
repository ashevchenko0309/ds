import { ColumnDef } from "@tanstack/react-table";
import BaseTable from "~/components/Tables/BaseTable";


const columns: ColumnDef<unknown>[] = [
	{
		id: "text",
		accessorKey: "Text",
		enableResizing: false,
		cell: () => "Text"
	},
	{
		id: "number",
		accessorKey: "Number",
		enableResizing: false,
		cell: () => 0
	},
	{
		id: "dropdown_from_list",
		accessorKey: "Dropdown (from list)",
		enableResizing: false,
	},
	{
		id: "dropdown_from_sql",
		accessorKey: "Dropdown (from sql)",
		enableResizing: false,
	},
	{
		id: "date",
		accessorKey: "Date",
		enableResizing: false,
		meta: {
			className: 'w-40'
		}
	},
];

const CreateChartTable = () => {
	const data = {
		items: [],
		total: 0
	}
	const isFetching = false;
	// const { data, isFetching } = useQuery<AxiosResponse<ConnectionsResponse>, AxiosError, ConnectionsResponse>({
	// 	queryKey: [CONNECTIONS_ENDPOINTS.root],
	// 	queryFn: () => apiInstance.get(CONNECTIONS_ENDPOINTS.root),
	// 	select: (response) => response.data,
	// });
	const tableData = [{}];
	const isEmpty = !isFetching && data?.total === 0;
	
	return (
		<div className="-mx-2">
			<BaseTable
				columns={columns}
				state={{}}
				data={tableData}
				isEmpty={isEmpty}
				isFetching={isFetching}
				isPagination={false}
			/>
		</div>
	)
}

export default CreateChartTable;