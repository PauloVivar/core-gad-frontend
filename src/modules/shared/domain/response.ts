export interface Response<T> {
  content: T[]
  empty: boolean
  first: boolean
  last: boolean
  number?: number
  numberOfElements?: number
  pageable?: {
    offset?: number
    pageNumber?: number
    pageSize?: number
    paged?: boolean
    sort?: []
    unpaged?: boolean
  }
  size?: number
  sort?: []
  totalElements: number
  totalPages: number
}
