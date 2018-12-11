const api = "http://localhost:3001";

let token = localStorage.token;

!token &&
  (token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8));

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const getAllCat = () =>
  fetch(`${api}/categories`, { headers })
    .then(response => response.json())
    .then(response => response.categories);

export const localToken = () => token;

export const newPost = post =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(post)
  })
    .then(response => response.json())
    .then(response => response);

export const editPost = (post, id) =>
  fetch(`${api}/posts/${id}`, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(post)
  })
    .then(response => response.json())
    .then(response => response);

export const getAllPost = () =>
  fetch(`${api}/posts`, { headers })
    .then(response => response.json())
    .then(response => response);

export const getOnePost = filter =>
  fetch(`${api}/${filter}/posts`, { headers })
    .then(response => response.json())
    .then(response => response);

export const getOnePostById = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(response => response.json())
    .then(response => response);

export const getComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(response => response.json())
    .then(response => response);

export const votingPost = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vote)
  })
    .then(response => response.json())
    .then(response => response);

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => response);

export const deleteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => response);

export const newComment = post =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then(response => response.json())
    .then(response => response);

export const editComment = (id, post) =>
  fetch(`${api}/comments/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then(response => response.json())
    .then(response => response);

export const voteComment = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vote)
  })
    .then(response => response.json())
    .then(response => response);

export const getPostById = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(response => response.json())
    .then(response => response);
