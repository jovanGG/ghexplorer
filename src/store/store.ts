import { legacy_createStore as createStore } from 'redux'
import { IFramework } from '../common/types';

import { ActionTypes, SET_REPOS } from "./actions";

function repoReducer(
  state: IFramework = {
    items: [],
    totalCount: 0,
  },
  action: ActionTypes) {
    switch(action.type) {

        case SET_REPOS:
            return {
                ...state,
                items: action.payload.items,
                totalCount: action.payload.totalCount
            }

        default:
            return state;
    }
  }

const store = createStore(repoReducer)

export default store;