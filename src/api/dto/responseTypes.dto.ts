export class ArrayResponse<T> {
  result: T[] = [];
  limit?: number;
  page?: number;
  pageCount?: number;
  filter?: object;
  message?: string = '';
  pageSize?: number;
  totalCount?: number;
}

export interface ObjectResponse<T> {
  result: T | null;
  message?: string;
}
