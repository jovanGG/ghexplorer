import React from 'react'

import { GoStar, GoGitBranch } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { IRepository } from '../../common/types'
import './style.css'

const Card = (repo: IRepository) => {
  return (
    <div className='repository'>
      <div className='repository-card'>
        <Link className='title' to={`/repository/${repo.full_name}`}>
          {repo.full_name}
        </Link>
        <div className='description'>{repo.description}</div>
        <div className='meta-data'>
          <span title='stargazers'>
              <GoStar />
            {repo.stargazers_count}
          </span>
          <span title='forks'>
              <GoGitBranch />
            {repo.forks_count}
          </span>
          <span title='author'>
            {repo.owner.login} <img src={repo.owner.avatar_url} className='avatar' />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
