import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface Paginator {
  pageSize: number
  pageNumber: number
  totalPages: number | undefined
}

export interface PaginatorProps {
  url: string
  paginator: Paginator
}

export const Paginatior: React.FC<PaginatorProps> = ({ url, paginator }) => {
  const { pageSize, pageNumber, totalPages } = paginator
  // console.log('prueba', paginator)
  return (
    <Pagination className="p-2">
      {totalPages == 1 || (
        <PaginationContent>
          <section>
            <span className="text-sm font-medium">
              Página {pageNumber} de {totalPages}
            </span>
          </section>

          <PaginationItem>
            <PaginationLink
              href={`${url}?pageSize=${pageSize}&pageNumber=${1}`}
              isActive
              className={
                pageNumber == 1 ? 'pointer-events-none opacity-50' : ''
              }
            >
              <ChevronDoubleLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {pageNumber == 0 || (
            <PaginationItem>
              <PaginationLink
                href={`${url}?pageSize=${pageSize}&pageNumber=${pageNumber - 1}`}
                isActive
                className={
                  pageNumber == 1 ? 'pointer-events-none opacity-50' : ''
                }
              >
                <ChevronLeft className="size-4" />
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              href={`${url}?pageSize=${pageSize}&pageNumber=${pageNumber + 1}`}
              isActive
              className={
                totalPages == pageNumber ? 'pointer-events-none opacity-50' : ''
              }
            >
              <ChevronRight className="size-4" />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href={`${url}?pageSize=${pageSize}&pageNumber=${totalPages}`}
              isActive
              className={
                totalPages == pageNumber ? 'pointer-events-none opacity-50' : ''
              }
            >
              <ChevronDoubleRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      )}
    </Pagination>
  )
}
