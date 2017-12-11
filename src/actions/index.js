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


export function getInitialData() {
  return function (dispatch) {
    return fetchCategories().then(categories => {
      dispatch(updateCategories(categories.categories))
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


export function getAllComments(postId) {
  return function (dispatch) {
    return fetchComments(postId).then(comments => {
      dispatch(addComments(postId, comments));
      return comments;
    })
  }
}


export function getAllPosts() {
  return function (dispatch) {
    return fetchAllPosts().then(response => {
      dispatch(getPosts(response));
      return response;
    })
  }
}

export function getAllCategoryPosts(category) {
  return function (dispatch) {
    return fetchCategoryPosts(category).then(response => {
      dispatch(getPosts(response));
      return response;
    })
  }
}


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


// export function editPost()

export function postVotes(postId, vote) {
  return function (dispatch) {
    return requestPostVote(postId, vote).then((post) => {
      dispatch(updatePostVote(post));
      return post;
    });
  }
}

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


export function editCurrentComment(commentId, comment, postId) {
  return function (dispatch) {
    return updateComment(commentId, comment).then((response) => {
      dispatch(getAllComments(postId));
      return response;
    });
  }
}


export function postCommentVote(postId, commentId, vote) {
  return function (dispatch) {
    return commentVote(commentId, vote).then((response) => {
      // dispatch(getAllComments(postId));
      // dispatch(getAllPosts());
      dispatch(updateCommentVote(postId, commentId, response.voteScore));
      return response;
    });
  }
}


export function updateCategories(categories) {
  return {
    type: UPDATE_CATEGORIES,
    categories,
  }
}


export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts,
  }
}


export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}


export function editPost(post) {
  return {
    type: EDIT_POST,
    post

  }
};


export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function addComments(postId, comments) {
  return {
    type: ADD_COMMENTS,
    postId,
    comments
  }
}


export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  }
};


export function updatePostVote(post) {
  return {
    type: UPDATE_POST_VOTE,
    post
  }
}


export function updateCommentVote(postId, commentId, vote) {
  return {
    type: UPDATE_COMMENT_VOTE,
    postId,
    commentId,
    vote
  }
}


export function sortByVotes() {
  return {
    type: SORT_BY_VOTES
  }
}

