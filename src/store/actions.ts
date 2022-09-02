import { IFramework } from "../common/types";

export const SET_REPOS = 'SET_REPOS';

export type ActionTypes = 
    | { type: typeof SET_REPOS; payload: IFramework };

export const setRepos = (repos: IFramework): ActionTypes => ({ type: SET_REPOS, payload: repos });