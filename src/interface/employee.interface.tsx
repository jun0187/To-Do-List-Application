export interface EmployeeModel {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  salary: number;
}

export interface EmployeeListApiRes {
  data: EmployeeListApiResData;
  statusCode: string;
  message: string;
}

export interface EmployeeListApiResData {
  content: Array<EmployeeModel>;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
  };
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
  //custom interface for frontend track
  isLoading: boolean;
  isError: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
