import * as Api from "../utils/api";

export const RECORD_POSTING = "RECORD_POSTING";
export const ORDER_POSTING = "ORDER_POSTING";
export const LOAD_POSTING = "LOAD_POSTSING";
export const LOAD_POSTING_BY_CAT = "LOAD_POSTING_BY_CAT";
export const VOTING_POSTING = "VOTING_POSTING";
export const DELETE_POSTING = "DELETE_POSTING";

export const RECORD_POST = "RECORD_POST";
export const ORDER_POST = "ORDER_POST";
export const LOAD_POST = "LOAD_POSTS";
export const VOTING_POST = "VOT_POST";
export const DELETE_POST = "DELETE_POST";

export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES";

export const LOAD_COMMENT = "ORDER_COMMENTS";
export const ORDER_COMMENTS = "ORDER_COMMENTS";
export const VOTING_COMMENT = "VOTING_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const NEW_COMMENT = "NEW_COMMENT";

export function loadPosting(data) {
  return {
    type: LOAD_POSTING,
    data
  };
}
export function callLoadPosting() {
  return dispatch => {
    Api.getAllPost().then(response => dispatch(loadPosting(response)));
  };
}
export function callDeletePosting(id) {
  return dispatch => {
    Api.deletePost(id).then(response => dispatch(callLoadPosting()));
  };
}
export function callVotePosting(id, vote) {
  return dispatch => {
    Api.votingPost(id, vote).then(response => dispatch(callLoadPosting()));
  };
}

export function loadComment(data) {
  return {
    type: LOAD_COMMENT,
    data
  };
}
export function callLoadComment(id) {
  return dispatch => {
    Api.getComments(id).then(response => dispatch(loadComment(response)));
  };
}
export function callNewComment(data) {
  return dispatch => {
    Api.newComment(data).then(response => loadComment());
  };
}

export function loadPostingByCat(categorie, data) {
  return {
    type: LOAD_POSTING_BY_CAT,
    categorie,
    data
  };
}
export function callLoadPostingByCat(categorie) {
  return dispatch => {
    Api.getOnePost(categorie).then(response =>
      dispatch(loadPostingByCat(categorie, response))
    );
  };
}

export function loadCategories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  };
}
export function callloadCategories() {
  return dispatch => {
    Api.getAllCat().then(response => dispatch(loadCategories(response)));
  };
}
export function selecionarCategoria(categoria) {
  return {
    type: SELECIONAR_CATEGORIA,
    categoria
  };
}
