export interface PaginationDTO<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T;
}
