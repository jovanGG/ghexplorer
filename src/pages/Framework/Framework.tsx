import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { getRepos } from '../../api'
import Pagination from '../../components/Pagination'
import Skeleton from '../../components/Skeleton'
import Card from '../../components/Card'
import { IFramework, IRepository } from '../../common/types'
import './style.css'

const Framework = () => {  
  const { framework = 'react' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState<IFramework>({ items: [], totalCount: 0 })
  const [sorting, setSorting] = useState('0')
  const [errorMessage, setErrorMessage] = useState(null)

  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  const page = searchParams.get('page') || '1'
  const perPage = searchParams.get('per_page') || '30'

  const getAllSearchParams = Object.fromEntries([...searchParams])

  const options: { [key: string]: object } = {
    '1': { sort: 'stars', order: 'desc' },
    '2': { sort: 'stars', order: 'asc' },
    '3': { sort: 'forks', order: 'desc' },
    '4': { sort: 'forks', order: 'asc' },
  }

  const loadRepos = async () => {
    setLoading(true)
    try {
      const { items, total_count: totalCount } = await getRepos({
        q: framework,
        page,
        'per_page': perPage,
        sort,
        order,
      })
      setRepos({ items, totalCount })
    } catch (error: any) {
      setErrorMessage(error?.message)
    } finally {
      setLoading(false)
    }
  }

  const onPageChange = (nextPage: number) => {
    setSearchParams({
      ...getAllSearchParams,
      page: nextPage.toString(),
    })
  }

  const handleOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    setSorting(event.target.value)
    setSearchParams({
      ...getAllSearchParams,
      ...options[event.target.value],
    })
  }

  useEffect(() => {
    loadRepos()
  }, [framework, page, perPage, sort, order])

  useEffect(() => {
    setSorting('0')
  }, [framework])

  return (
    <div className='main-wrapper'>
      <select value={sorting} placeholder='Sort' onChange={handleOptions}>
        <option value='0'>Sort</option>
        <option value='1'>Most stars</option>
        <option value='2'>Least stars</option>
        <option value='3'>Most forks</option>
        <option value='4'>Least forks</option>
      </select>
      {loading ? (
        <Skeleton count={30} />
      ) : errorMessage ? (
        <h1>{errorMessage}</h1>
      ) : (
        <div className='list-container'>
          {repos && repos.items.map((repo: IRepository, index) => <Card {...repo} key={index} />)}
        </div>
      )}
      {errorMessage ? null : (
        <Pagination total={repos.totalCount} limit={parseInt(perPage)} currentPage={parseInt(page)} onPageChange={onPageChange} />
      )}
    </div>
  )
}

export default Framework
