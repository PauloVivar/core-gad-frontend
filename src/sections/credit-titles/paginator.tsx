import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export interface Paginator {
  pageSize: number
  pageNumber: number
  totalPages: number
  totalRows: number
}

export interface PaginatorProps {
  url: string
  paginator: Paginator
}

export const Paginatior: React.FC<PaginatorProps> = ({ url, paginator }) => {
  const { pageSize, pageNumber, totalPages } = paginator
  const [activePage, setActivePage] = useState(pageNumber)

  const handleClick = (page: number) => {
    setActivePage(page)
  }

  return (
    <Pagination>
      {totalPages == 1 || (
        <PaginationContent>
          <section>
            <span className="text-sm font-medium">
              Pagina {pageNumber} de {totalPages}
            </span>
          </section>

          <PaginationItem>
            <PaginationLink
              href={`${url}?pageSize=${pageSize}&pageNumber=${1}`}
              isActive={activePage == 1}
              onClick={() => handleClick(1)}
              className={pageSize == 1 ? 'disabled' : ''}
            >
              <ChevronDoubleLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {pageNumber == 0 || (
            <PaginationItem>
              <PaginationLink
                href={`${url}?pageSize=${pageSize}&pageNumber=${pageNumber - 1}`}
                isActive={activePage == pageNumber - 1}
                onClick={() => handleClick(pageNumber - 1)}
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
              isActive={activePage == totalPages}
              onClick={() => handleClick(totalPages)}
            >
              <ChevronDoubleRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      )}
    </Pagination>
  )
}
