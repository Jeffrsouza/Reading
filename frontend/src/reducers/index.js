import { combineReducers } from "redux";

import {
  //POSTING
  RECORD_POSTING,
  ORDER_POSTING,
  LOAD_POSTING,
  VOTING_POSTING,
  DELETE_POSTING,
  LOAD_POSTING_BY_CAT,
  ONE_POSTING,
  EDIT_POSTING,
  //CAT
  FILTER_CATEGORY,
  LOAD_CATEGORIES,
  //COMMENT
  LOAD_COMMENT,
  VOTING_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  NEW_COMMENT,
  OPEN_COMMENTS
} from "../actions";

const initialStateFilter = {
  fitler: "all"
};

function filter(state = initialStateFilter, action) {
  switch (action.type) {
    case FILTER_CATEGORY:
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    default:
      return state;
  }
}

const initStatePosts = {
  posts: []
};
export function posts(state = initStatePosts, action) {
  switch (action.type) {
    case RECORD_POSTING:
      return { ...state, posts: [...state.posts, action.data] };
    case EDIT_POSTING:
      return {
        ...state,
        posts: state.posts
          .filter(p => p.id !== action.data.id)
          .push(action.data)
      };
    case ORDER_POSTING:
      let alterState = state;
      return {
        ...state,
        posts:
          action.order === "date"
            ? alterState.posts.sort((a, b) => {
                return b.timestamp - a.timestamp;
              })
            : alterState.posts.sort((a, b) => {
                return b.voteScore - a.voteScore;
              })
      };
    case LOAD_POSTING:
      return { ...state, posts: action.data };
    case LOAD_POSTING_BY_CAT:
      return {
        ...state,
        posts: action.data
      };
    case VOTING_POSTING:
      return {
        ...state,
        posts: state.posts
          .filter(post => post.id !== action.data.id)
          .concat(action.data)
          .sort((a, b) => {
            return action.order === "date"
              ? b.timestamp - a.timestamp
              : b.voteScore - a.voteScore;
          })
      };

    case DELETE_POSTING:
      return { ...state, posts: action.data };
    default:
      return state;
  }
}

export function comments(state = initStatePosting, action) {
  switch (action.type) {
    case LOAD_COMMENT:
      return {
        ...state,
        comments: action.data.sort((a, b) => {
          return b.voteScore - a.voteScore;
        })
      };
    case VOTING_COMMENT:
      return {
        ...state,
        comments: state.comments.map(com => {
          if (com.id === action.id) {
            com.voteScore =
              action.vote === "upVote" ? com.voteScore + 1 : com.voteScore - 1;
          }
          return comments;
        })
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(com => com.id !== action.id)
      };
    case EDIT_COMMENT: {
      return {
        ...state,
        comments: Object.assing(
          state.comments.filter(com => com.id !== action.id),
          action.data
        )
      };
    }
    case NEW_COMMENT:
      return { ...state, comments: action.data };
    default:
      return state;
  }
}

export function openComments(state = false, action) {
  switch (action.type) {
    case OPEN_COMMENTS:
      return { ...state, open: action.id };
    default:
      return state;
  }
}

const initStatePosting = {
  posting: { voteScore: 0 }
};
export function posting(state = posting, action) {
  switch (action.type) {
    case ONE_POSTING:
      console.log("ok" + action.data.voteScore);
      return { ...state, posting: action.data };

    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
  filter,
  openComments,
  posting
});
