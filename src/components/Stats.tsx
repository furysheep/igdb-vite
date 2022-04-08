import React from 'react'
import { useQuery } from 'react-query'

type Props = {}

interface Group {
  name: string
  description: string
  subscribers_count: string
  stargazers_count: string
  forks_count: string
}

const Stats = (props: Props) => {
  const { isLoading, error, data } = useQuery<Group, Error>('repoData', () =>
    fetch('https://api.github.com/repos/timolins/react-hot-toast').then(res =>
      res.json()
    )
  )

  if (isLoading) return <>Loading...</>

  if (error) return <>{`An error has occurred: ${error.message}`}</>

  if (!data) {
    console.error('No data here!');
    return <>No data here</>
  }
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>� {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>� {data.forks_count}</strong>
    </div>
  )

}

export default Stats