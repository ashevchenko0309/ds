import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

const useBaseTableState = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  return {
    pagination,
    setPagination,
  }
}

export default useBaseTableState;
