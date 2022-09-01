import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getRepos } from '../../api'
import Pagination from '../../components/Pagination'
import Skeleton from '../../components/Skeleton'
import Card from '../../components/Card'
import { IFramework, IRepository } from '../../common/types'
import './style.css'
import { setRepos } from '../../store/actions'
import Filter from '../../components/Filter'

const Framework = () => {
  const repos = useSelector((state: IFramework) => state)
  const dispatch = useDispatch()

  const { framework = 'react' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState('0')
  const [errorMessage, setErrorMessage] = useState(null)

  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  const page = searchParams.get('page') || '1'
  const perPage = searchParams.get('per_page') || '30'

  const getAllSearchParams = Object.fromEntries([...searchParams])

  const filterProps = { sorting, setSorting, searchParams, setSearchParams }

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
      dispatch(setRepos({ items, totalCount }))
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

  useEffect(() => {
    loadRepos()
  }, [framework, page, perPage, sort, order])

  useEffect(() => {
    setSorting('0')
  }, [framework])

  return (
    <div className='main-wrapper'>
      <Filter {...filterProps} />
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
        <Pagination
          total={repos.totalCount}
          limit={parseInt(perPage)}
          currentPage={parseInt(page)}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

export default Framework
