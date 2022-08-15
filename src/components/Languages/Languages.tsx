import React, { useEffect, useState } from 'react'

import { getRepo } from '../../api'
import { ILanguages } from '../../common/types'
import Loader from '../Loader/Loader'
import './style.css'

const Languages = ({ repository }: { repository: string | undefined }) => {
  const [languages, setLanguages] = useState<ILanguages | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const loadLanguages = async () => {
    setLoading(true)
    try {
      const languages = await getRepo(`${repository}/languages`)
      setLanguages(languages)
    } catch (error: any) {
      setErrorMessage(error?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLanguages()
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
              <th>Languages</th>
            </tr>
            {languages &&
              Object.keys(languages).map((key, index) => (
                <tr key={index}>
                  <td>
                    {key}: {languages[key]}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Languages
