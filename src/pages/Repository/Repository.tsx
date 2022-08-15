import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GoStar, GoGitBranch, GoIssueOpened } from 'react-icons/go'
import { getRepo } from '../../api'
import Loader from '../../components/Loader'
import './style.css'
import { IRepository } from '../../common/types'
import Contributors from '../../components/Contributors'
import Languages from '../../components/Languages'

const Repository = () => {
  const { '*': repository } = useParams()

  const [loading, setLoading] = useState(false)
  const [repo, setRepo] = useState<IRepository | null>(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const loadRepo = async () => {
    setLoading(true)
    try {
      const repo = await getRepo(repository)
      setRepo(repo)
    } catch (error: any) {
      setErrorMessage(error?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRepo()
  }, [repository])

  return (
    <div className='container'>
      {errorMessage && errorMessage ? (
        <h1 style={{ textAlign: 'center' }}>{errorMessage}</h1>
      ) : (
        <div className='repo'>
          {loading ? (
            <Loader />
          ) : (
            repo && (
              <div className='repo-header'>
                <img className='repo-img' src={repo.owner.avatar_url} alt={repo.full_name} />
                <div className='repo-content'>
                  <h1 className='repo-title'>{repo.full_name}</h1>
                  <p className='repo-description'>{repo.description}</p>
                  <div className='repo-stats'>
                    <span title='stargazers'>
                      <GoStar />
                      {repo.stargazers_count}
                    </span>
                    <span title='forks'>
                      <GoGitBranch />
                      {repo.forks_count}
                    </span>
                    <span title='author'>
                      <img src={repo.owner.avatar_url} className='avatar' /> {repo.owner.login}
                    </span>
                    <span title='issues'>
                      <GoIssueOpened />
                      {repo.open_issues_count}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
          <div className='repo-body'>
            {repository && <Contributors repository={repository} />}
            {repository && <Languages repository={repository} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default Repository
