import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPDATE_CATEGORIES,
  GET_POSTS,
  UPDATE_POST_COMMENTS,
  UPDATE_POST_VOTE,
  UPDATE_COMMENT_VOTE,
  SORT_BY_VOTES
} from '../actions'


const addPostToState = (state, post) => {
  if (!post) return state;
  const nextState = {...state};
  nextState.posts.push(post);
  return nextState;
};

const editPostInState = (state, currentPost) => {
  const nextState = {...state};
  const nextPosts = nextState.posts.slice(0);
  nextState.posts = nextPosts.map(post => {
    if (parseInt(post.id) === parseInt(currentPost.id)) return {...post, ...currentPost};
    return post;
  });
  return nextState;
};

const deletePostFromState = (state, postId) => {
  const nextState = {...state};
  const nextPosts = nextState.posts.slice(0);
  nextState.posts = nextPosts.filter(post => post.id != postId);
  return nextState;
};

const addCommentToPostInState = (state, comment) => {
  const nextState = {...state};
  const nextPosts = nextState.posts.slice(0);
  nextState.posts = nextPosts.map(post => {
    if (parseInt(post.id) === parseInt(comment.parentId)) {
      let nextPost = {...post};
      if (!nextPost.comments) nextPost.comments = [];
      nextPost.comments.push(comment);
      return nextPost;
    }
    return post;
  });
  return nextState;
};

const addCommentsToPostInState = (state, postId, comments) => {
  const nextState = {...state};
  const nextPosts = nextState.posts.slice(0);
  nextState.posts = nextPosts.map(post => {
    if (parseInt(post.id) === parseInt(postId)) {
      let nextPost = {...post};
      nextPost.comments = comments;
      return nextPost;
    }
    return post;
  });
  return nextState;
}


const deleteCommentForPostInState = (state, postId, commentId) => {
  const nextState = {...state};
  const nextPosts = nextState.posts.slice(0);
  nextState.posts = nextPosts.map(post => {
    if (parseInt(post.id) === parseInt(postId)) {
      let nextPost = {...post};
      nextPost.comments = nextPost.comments.filter(comment => comment.id != commentId);
      return nextPost;
    }
    return post;
  });
  return nextState;
};

const updatePostVoteForPostInState = (state, postId, voteScore) => {
  const nextState = {...state};
  const nextPosts = nextState.posts.slice(0);
  nextState.posts = nextPosts.map(post => {
    if (parseInt(post.id) === parseInt(postId)) {
      let nextPost = {...post};
      nextPost.voteScore = voteScore;
      return nextPost;
    }
    return post;
  });
  return nextState;
}


const updateCommentVoteForPostInState = (state, postId, commentId, voteScore) => {
  const nextState = {...state};
  const nextPosts = nextState.posts.slice(0);
  nextState.posts = nextPosts.map(post => {
    if (parseInt(post.id) === parseInt(postId)) {
      let nextPost = {...post};
      nextPost.comments = nextPost.comments.map(comment => {
        if (parseInt(comment.id) === parseInt(commentId)) {
          const nextComment = {...comment};
          nextComment.voteScore = voteScore;
          return nextComment;
        }

        return comment;
      })
      return nextPost;
    }
    return post;
  });
  return nextState;
}


const sortAsc = (a, b) => {
  if (a < b ) return -1;
  if (a > b ) return 1;
  return 0;
}

const sortDesc = (a, b) => {
  if (a > b ) return -1;
  if (a < b ) return 1;
  return 0;
}

const sortPostsByVotesInState = (state) => {
  const nextState = {...state};
  const nextPosts = nextState.posts.slice(0);
  const sortFunc = nextState.postsFilter.sort === 'asc' ? sortAsc : sortDesc;
  nextState.posts =  nextPosts.sort((a, b) => sortFunc(parseInt(a.voteScore), parseInt(b.voteScore)));
  nextState.postsFilter.sort = nextState.postsFilter.sort === 'asc' ? 'desc' : 'asc';
  return nextState;
}



const initialState = {
  categories: [],
  posts: [],
  postsFilter: {
    key: 'voteScore',
    sort: 'asc'
  },
};


function reducer(state = initialState, action) {
  const nextState = {...state};
  let postId = null;
  let nextPosts = [];
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {...state, categories: action.categories};
    case GET_POSTS:
      return {...state, posts: action.posts};
    case ADD_POST:
      return addPostToState(state, action.post);
    case EDIT_POST:
      return editPostInState(state, action.post);
    case DELETE_POST:
      return deletePostFromState(state, action.postId);
    case ADD_COMMENT:
      return addCommentToPostInState(state, action.comment);
    case ADD_COMMENTS:
      return addCommentsToPostInState(state, action.postId, action.comments);
    case EDIT_COMMENT:
      return state;
    case DELETE_COMMENT:
      return deleteCommentForPostInState(state, action.postId, action.commentId);
    case UPDATE_POST_VOTE:
      return updatePostVoteForPostInState(state, action.post.id, action.post.voteScore);
    case UPDATE_COMMENT_VOTE:
      return updateCommentVoteForPostInState(state, action.postId, action.commentId, action.vote);
    case SORT_BY_VOTES:
      return sortPostsByVotesInState(state);
    default:
      return state;
  }
}

export default reducer;


