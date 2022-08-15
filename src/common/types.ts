export interface IRepository {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

export interface IContributor {
  login: string
  avatar_url: string
  contributions: number
}

export interface ILanguages {
  [key: string]: number
}

export interface IFramework {
  items: Array<IRepository>
  totalCount: number
}
