import * as Api from "../utils/api";

export const RECORD_POSTING = "RECORD_POSTING";
export const EDIT_POSTING = "RECORD_POSTING";
export const ORDER_POSTING = "ORDER_POSTING";
export const LOAD_POSTING = "LOAD_POSTSING";
export const LOAD_POSTING_BY_CAT = "LOAD_POSTING_BY_CAT";
export const VOTING_POSTING = "VOTING_POSTING";
export const DELETE_POSTING = "DELETE_POSTING";
export const ONE_POSTING = "ONE_POSTING";

export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES";

export const LOAD_COMMENT = "LOAD_COMMENT";
export const VOTING_COMMENT = "VOTING_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const NEW_COMMENT = "NEW_COMMENT";
export const OPEN_COMMENTS = "OPEN_COMMENTS";

//Posting
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
export function callVotePosting(id, vote, order) {
  return dispatch => {
    Api.votingPost(id, vote).then(response =>
      dispatch(votePosting(response, order))
    );
  };
}
export function votePosting(data, order) {
  return {
    type: VOTING_POSTING,
    data,
    order
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
export function callOrderPosting(order) {
  return dispatch => {
    Api.getAllPost().then(response => dispatch(orderPosting(response, order)));
  };
}
export function orderPosting(data, order) {
  return {
    type: ORDER_POSTING,
    data,
    order
  };
}
export function callRecordPost(post) {
  return dispatch => {
    Api.newPost(post).then(response => dispatch(recordPost(response)));
  };
}
export function recordPost(data) {
  return { type: RECORD_POSTING, data };
}
export function callGetOnePostByEdit(id) {
  return dispatch => {
    Api.getOnePostById(id).then(response =>
      dispatch(getOnePostByEdit(response))
    );
  };
}
export function getOnePostByEdit(data) {
  return {
    type: ONE_POSTING,
    data
  };
}

export function callVotePostingByUnique(id, vote) {
  return dispatch => {
    Api.votingPost(id, vote).then(response => this.callGetOnePostByEdit(id));
  };
}

export function callEditPost(post, id) {
  return dispatch => {
    Api.editPost(post, id).then(response => dispatch(editPost(response)));
  };
}
export function editPost(data) {
  return {
    type: EDIT_POSTING,
    data
  };
}
//Comment
export function callVoteComment(id, vote) {
  return dispatch => {
    Api.voteComment(id, vote).then(response =>
      dispatch(voteCommentId(id, vote.option))
    );
  };
}
export function voteCommentId(id, vote) {
  return {
    type: VOTING_COMMENT,
    id,
    vote
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
    Api.newComment(data).then(response => {
      loadComment();
      this.callLoadPosting();
    });
  };
}
export function callOpenComments(id) {
  return dispatch => openComments(id);
}
export function openComments(id) {
  return {
    type: OPEN_COMMENTS,
    id
  };
}
export function callEditComment(id, post) {
  return dispatch => {
    Api.editComment(id, post).then(response => editCommentId(id, response));
  };
}
export function editCommentId(id, data) {
  return {
    type: EDIT_COMMENT,
    id,
    data
  };
}
export function callDeleteComment(id, vote) {
  return dispatch => {
    Api.deleteComment(id).then(response => voteCommentId(response.id));
  };
}
export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  };
}

//Categories
export function loadCategories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  };
}
export function callLoadCategories() {
  return dispatch => {
    Api.getAllCat().then(response => dispatch(loadCategories(response)));
  };
}
export function callFilterCategories(filter = "all") {
  return {
    type: FILTER_CATEGORY,
    filter
  };
}
