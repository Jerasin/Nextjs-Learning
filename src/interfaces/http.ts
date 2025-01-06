export interface HtttpResponse<T> {
  data: T;
  error: any;
  isLoading: boolean;
}
