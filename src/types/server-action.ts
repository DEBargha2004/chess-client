export type ServerActionResponse<T = string> =
  | { status: 'success'; message: T }
  | { status: 'error'; message: string }
