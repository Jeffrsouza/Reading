import { combineReducers } from "redux";

import {
  //POSTING
  RECORD_POSTING,
  ORDER_POSTING,
  LOAD_POSTING,
  VOTING_POSTING,
  DELETE_POSTING,
  //POST
  RECORD_POST,
  ORDER_POST,
  LOAD_POST,
  VOTING_POST,
  DELETE_POST,
  //CAT
  FILTER_CATEGORY,
  LOAD_CATEGORIES,
  //COMMENT
  LOAD_COMMENT,
  ORDER_COMMENTS,
  VOTING_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  NEW_COMMENT
} from "../actions";

function categorias(state = {}, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    case FILTER_CATEGORY:
      return {
        ...state,
        categories: action.categories
      };
    default:
      return state;
  }
}

const initStatePosting = {
  posts: []
};
export function posts(state = initStatePosting, action) {
  switch (action.type) {
    case RECORD_POSTING:
      return { ...state, posts: action.data };
    case ORDER_POSTING:
      return { ...state, posts: action.data };
    case LOAD_POSTING:
      return { ...state, posts: action.data };
    case VOTING_POSTING:
      return { ...state, posts: action.data };
    case DELETE_POSTING:
      return { ...state, posts: action.data };
    default:
      return state;
  }
}

export function post(state = initStatePosting, action) {
  switch (action.type) {
    case RECORD_POST:
      return { ...state, postagens: action.postagens };
    case ORDER_POST:
      return { ...state, postagens: action.postagens };
    case LOAD_POST:
      return { ...state, postagens: action.postagens };
    case VOTING_POST:
      return { ...state, postagens: action.postagens };
    case DELETE_POST:
      return { ...state, postagens: action.postagens };
    default:
      return state;
  }
}

export function comments(state = initStatePosting, action) {
  switch (action.type) {
    case LOAD_COMMENT:
      return { ...state, comments: action.data };
    case ORDER_COMMENTS:
      return { ...state, comments: action.data };
    case VOTING_COMMENT:
      return { ...state, comments: action.data };
    case DELETE_COMMENT:
      return { ...state, comments: action.data };
    case EDIT_COMMENT:
      return { ...state, comments: action.data };
    case NEW_COMMENT:
      return { ...state, comments: action.data };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments
});
