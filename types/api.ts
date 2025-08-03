// General API response types
export interface ApiResponse<T> {
  data: T
  meta?: any // For pagination, etc.
}

export interface ApiError {
  message: string
  statusCode: number
  details?: any
}
