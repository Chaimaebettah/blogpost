import {
  fetchCategories,
  fetchAllPosts,
  fetchCategoryPosts,
  fetchComments,
  commentVote,
  updateComment,
  requestPostVote,
  requestDeletePost,
  requestDeleteComment,
} from '../helpers/request';


export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const UPDATE_POST_COMMENTS = 'UPDATE_POST_COMMENTS';
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE';

export const SORT_BY_VOTES = 'SORT_BY_VOTES';

/**
 * Get initial app data
 * @returns {Function}
 */
export function getInitialData() {
  return function (dispatch) {
    return fetchCategories().then(categories => {
      if (!categories) return null;
      dispatch(updateCategories(categories.categories));
      return fetchAllPosts()
        .then(posts => {
          dispatch(getPosts(posts));
          posts.forEach(post => {
            dispatch(getAllComments(post.id))
          });
          return posts;
        })
    });
  }
}


/**
 * Get all comments for a post
 * @param postId
 * @returns {Function}
 */
export function getAllComments(postId) {
  return function (dispatch) {
    return fetchComments(postId).then(comments => {
      dispatch(addComments(postId, comments));
      return comments;
    })
  }
}


/**
 * Get all posts
 * @returns {Function}
 */
export function getAllPosts() {
  return function (dispatch) {
    return fetchAllPosts().then(response => {
      dispatch(getPosts(response));
      return response;
    })
  }
}


/**
 * Get all posts in a given category
 * @param category
 * @returns {Function}
 */
export function getAllCategoryPosts(category) {
  return function (dispatch) {
    return fetchCategoryPosts(category).then(response => {
      dispatch(getPosts(response));
      return response;
    })
  }
}


/**
 * delete a post by id
 * @param postId
 * @returns {Function}
 */
export function deletePost(postId) {
  return function (dispatch) {
    return requestDeletePost(postId).then((response) => {
      dispatch({
        type: DELETE_POST,
        postId
      });
      return response;
    });
  }
}


/**
 * vote on a post
 * @param postId
 * @param vote
 * @returns {Function}
 */
export function postVotes(postId, vote) {
  return function (dispatch) {
    return requestPostVote(postId, vote).then((post) => {
      dispatch(updatePostVote(post));
      return post;
    });
  }
}


/**
 * delete a comment from a post
 * @param postId
 * @param commentId
 * @returns {Function}
 */
export function deleteComment(postId, commentId) {
  return function (dispatch) {
    return requestDeleteComment(commentId).then((response) => {
      dispatch({
        type: DELETE_COMMENT,
        postId,
        commentId
      });
      return response;
    });
  }
}


/**
 * Edit a comment on a post
 * @param commentId
 * @param comment
 * @param postId
 * @returns {Function}
 */
export function editCurrentComment(commentId, comment, postId) {
  return function (dispatch) {
    return updateComment(commentId, comment).then((response) => {
      dispatch(getAllComments(postId));
      return response;
    });
  }
}


/**
 * vote on a comment
 * @param postId
 * @param commentId
 * @param vote
 * @returns {Function}
 */
export function postCommentVote(postId, commentId, vote) {
  return function (dispatch) {
    return commentVote(commentId, vote).then((response) => {
      dispatch(updateCommentVote(postId, commentId, response.voteScore));
      return response;
    });
  }
}


/**
 * update the app with available categories
 * @param categories
 * @returns {{type: string, categories: *}}
 */
export function updateCategories(categories) {
  return {
    type: UPDATE_CATEGORIES,
    categories,
  }
}


/**
 * Get all posts
 * @param posts
 * @returns {{type: string, posts: *}}
 */
export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts,
  }
}


/**
 * Add a post
 * @param post
 * @returns {{type: string, post: *}}
 */
export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}


/**
 * Edit a post
 * @param post
 * @returns {{type: string, post: *}}
 */
export function editPost(post) {
  return {
    type: EDIT_POST,
    post

  }
};


/**
 * Add a comment
 * @param comment
 * @returns {{type: string, comment: *}}
 */
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

/**
 * Add multiple comments to a post
 * @param postId
 * @param comments
 * @returns {{type: string, postId: *, comments: *}}
 */
export function addComments(postId, comments) {
  return {
    type: ADD_COMMENTS,
    postId,
    comments
  }
}


/**
 * Edit a comment
 * @param comment
 * @returns {{type: string, comment: *}}
 */
export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  }
};


/**
 * Update post with a vote
 * @param post
 * @returns {{type: string, post: *}}
 */
export function updatePostVote(post) {
  return {
    type: UPDATE_POST_VOTE,
    post
  }
}


/**
 * Update a comment with a vote
 * @param postId
 * @param commentId
 * @param vote
 * @returns {{type: string, postId: *, commentId: *, vote: *}}
 */
export function updateCommentVote(postId, commentId, vote) {
  return {
    type: UPDATE_COMMENT_VOTE,
    postId,
    commentId,
    vote
  }
}


/**
 * Sort posts by votes
 * @returns {{type: string}}
 */
export function sortByVotes() {
  return {
    type: SORT_BY_VOTES
  }
}

