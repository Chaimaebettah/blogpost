const request = (url, options = {}) => {
  const nextOptions = {
    headers: {
      'Authorization': 'test-authorization-header',
      'Content-Type': 'application/json',
    },
    ...options
  };

  return fetch(`http://localhost:3001${url}`, nextOptions)
    .then(response => response.json())
    .catch(error => console.log(error));
};


export const fetchCategories = () => {
  return request('/categories')
};

export const fetchCategoryPosts = (categoryName) => {
  return request(`/${categoryName}/posts`)
};

export const addPosts = (values) => {
  return request('/posts', {method: 'POST', body: JSON.stringify(values)})
};

export const fetchPost = (postId) => {
  return request(`/posts/${postId}`)
};


export const editPost = (values, postId) => {
  return request(`/posts/${postId}`, {method: 'PUT', body: JSON.stringify(values)})
};


export const requestDeletePost = (postId) => {
  return request(`/posts/${postId}`, {method: 'DELETE'})
};


export const requestAddComment = (comment) => {
  return request('/comments', {method: 'POST', body: JSON.stringify(comment)})
};


export const fetchComments = (postId) => {
  return request(`/posts/${postId}/comments`);
};


export const requestDeleteComment = (commentId) => {
  return request(`/comments/${commentId}`, {method: 'DELETE'})
};

export const updateComment = (commentId, values) => {
  return request(`/comments/${commentId}`, {method: 'PUT', body: JSON.stringify(values)})
};

export const fetchAllPosts = () => {
  return request('/posts')
};


export const requestPostVote = (postId, vote) => {
  return request(`/posts/${postId}`, {method: 'POST', body: JSON.stringify({option: vote})})

};


export const commentVote = (commentId, vote) => {
  return request(`/comments/${commentId}`, {method: 'POST', body: JSON.stringify({option: vote})});

};












