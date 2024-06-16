export interface DataPagination {
  previousPage: number;
  currentPage: number;
  nextPage: number;
  total: number;
  limit: number;
}

export interface DataMetadata {
  pagination: DataPagination;
}
