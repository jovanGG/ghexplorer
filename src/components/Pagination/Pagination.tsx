import React from 'react'

import './style.css'

const range = (start: number, end: number) => {
  return Array.from(Array(end).keys()).map((el) => el + start)
}

const PaginationItem = ({ page, currentPage, onPageChange }: {page: number, currentPage: number, onPageChange: (page: number) => void}) => {

  return (
    <li className={`page-item ${page === currentPage ? 'active' : ''}`} onClick={() => onPageChange(page)}>
      <span className='page-link'>{page}</span>
    </li>
  )
}

const PaginationControl = ({ control, onPageChange }: {control: string, onPageChange: () => void}) => {
  return(
    <li className='page-item' onClick={() => onPageChange()}>
      <span className='page-link'>{control}</span>
    </li>
  )
}

const Pagination = ({ currentPage, total, limit, onPageChange }: {currentPage: number, total: number, limit: number, onPageChange: (page: number) => void}) => {
    
  // const pageCount = Math.ceil(total / limit); Github API limited to 1000 results, values for range are hardcoded
  const pageCount = 20;
  const pages = range(currentPage >= 3 ? currentPage -2 : 1, 5)

  const onPrevious = () => {
    onPageChange(currentPage < 2 ? currentPage : currentPage - 1)
  }

  const onNext = () => {
    onPageChange(currentPage < pageCount ? currentPage + 1 : pageCount)
  }

  return (
    <ul className='pagination'>
      <PaginationControl control='Prev' onPageChange={onPrevious} />
      {pages.map((page) => (
        page > pageCount ? null :
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
      <PaginationControl control='Next' onPageChange={onNext} />
    </ul>
  )
}
export default Pagination
