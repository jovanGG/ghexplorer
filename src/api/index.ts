import agent from "./agent"

export async function getRepos(params: object) {
    const response = await agent.get('/search/repositories', { params })    
    return response.data
}

export async function getRepo(query: string | undefined) {
    const response = await agent.get(`/repos/${query}`)
    return response.data
}