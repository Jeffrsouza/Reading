import {
  RECORD_POST,
  ORDER_POST,
  LOAD_POSTS,
  VOTING_POST,
  DELETE_POST
} from "../actions/ActionsList";
import { PostEntity } from "../entities/PostEntity";

const STATE_INI = {
  PostEntity,
  fieldsErros: []
};

export default (state = STATE_INI, action) => {
  switch (action.type) {
    case RECORD_POST:
      return {
        ...state,
        PostEntity: { ...state.PostEntity, [action.field]: action.payload }
      };
    case ORDER_POST:
      return {
        ...state,
        PostEntity: { ...state.PostEntity, category: action.payload }
      };
    case LOAD_POSTS:
      return { ...state, PostEntity: action.payload };
    case VOTING_POST:
      return {
        ...state,
        PostEntity: { ...state.PostEntity, ...action.payload }
      };
    case DELETE_POST:
      return { ...state, fieldsErros: action.payload };
    default:
      return state;
  }
};
