import React, { ChangeEvent } from 'react'

const Filter = ({
  sorting,
  setSorting,
  searchParams,
  setSearchParams,
}: {
  sorting: string
  setSorting: React.Dispatch<React.SetStateAction<string>>
  searchParams: URLSearchParams,
  setSearchParams: any
}) => {
  const options: { [key: string]: object } = {
    '1': { sort: 'stars', order: 'desc' },
    '2': { sort: 'stars', order: 'asc' },
    '3': { sort: 'forks', order: 'desc' },
    '4': { sort: 'forks', order: 'asc' },
  }

  const getAllSearchParams = Object.fromEntries([...searchParams])

  const handleOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    setSorting(event.target.value)
    setSearchParams({
      ...getAllSearchParams,
      ...options[event.target.value],
    })
  }

  return (
    <>
      <select value={sorting} placeholder='Sort' onChange={handleOptions}>
        <option value='0'>Sort</option>
        <option value='1'>Most stars</option>
        <option value='2'>Least stars</option>
        <option value='3'>Most forks</option>
        <option value='4'>Least forks</option>
      </select>
    </>
  )
}

export default Filter
