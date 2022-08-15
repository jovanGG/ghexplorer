import React, { useEffect, useState } from 'react'

import { getRepo } from '../../api'
import { IContributor } from '../../common/types'
import Loader from '../Loader/Loader'
import './style.css'

const Contributors = ({ repository }: { repository: string | undefined }) => {
  const [loading, setLoading] = useState(false)
  const [contributors, setContributors] = useState<IContributor[] | null>([])
  const [errorMessage, setErrorMessage] = useState(null)

  const loadContributors = async () => {
    setLoading(true)
    try {
      const contributors = await getRepo(`${repository}/contributors`)
      setContributors(contributors)
    } catch (error: any) {
      setErrorMessage(error?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContributors()
  }, [repository])

  return (
    <div>
      {errorMessage && errorMessage ? (
        <h1 style={{ textAlign: 'center' }}>{errorMessage}</h1>
      ) : loading ? (
        <Loader />
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Author</th>
              <th>Contributions</th>
            </tr>
            {contributors &&
              contributors.slice(0, 11).map((contributor, index) => (
                <tr key={index}>
                  <td>
                    <img src={contributor.avatar_url} className='avatar' />
                    {contributor.login}
                  </td>
                  <td>{contributor.contributions}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Contributors
