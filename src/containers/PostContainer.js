import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {requestAddComment} from '../helpers/request';

import {connect} from 'react-redux'

import {
  getAllPosts,
  getAllComments,
  postCommentVote,
  deleteComment,
  editCurrentComment,
  postVotes,
  addComment,
} from '../actions'

import Post from '../components/Post';

class PostContainer extends Component {

  state = {
    commentForm: {},
    activeEditCommentId: null,
  };

  handleSubmit = (form) => (e) => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (err) return;

      const nextValues = {};
      nextValues.id = Math.floor(Math.random() * 200000);
      nextValues.timestamp = Date.now();
      nextValues.parentId = this.props.match.params.id;
      nextValues.body = values.comment;
      this.setState({username: values.author});
      nextValues.author = values.author;
      requestAddComment(nextValues).then((response ) => {
        const postId = this.props.match.params.id;
        this.props.dispatch(addComment(response));

        form.resetFields();

      })
    });
  };

  deleteComment = (postId, commentId) => {
    this.props.dispatch(deleteComment(postId, commentId))
  };

  toggleEditComment = (id) => {
    const nextState = {...this.state};
    nextState.activeEditCommentId = id ? id : null;
    this.setState(nextState);
  };

  editComment = (form) => (e) => {
    const postId = this.props.match.params.id;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      const nextValues = {};
      nextValues.id = values.id;
      nextValues.body = values.comment;
      nextValues.author = values.author;
      console.log(nextValues);
      this.props.dispatch(editCurrentComment(nextValues.id, nextValues, postId))
        .then(() => {
          this.toggleEditComment();
        })
    })
  };


  handlePostVoteClick = (e) => {
    const postId = this.props.match.params.id;
    const id = e.target.id;
    this.props.dispatch(postVotes(postId, id))
  };


  handleCommentVoteClick = (e, commentId) => {
    e.stopPropagation();
    const vote = e.target.id;
    const postId = this.props.match.params.id;
    this.props.dispatch(postCommentVote(postId, commentId, vote));
  };


  render() {
    const post = this.props.posts.find(post => parseInt(post.id) === parseInt(this.props.match.params.id));
    if (!post) return null;

    return (
      <Post
        {...post}
        commentForm={this.state.commentForm}
        activeEditCommentId={this.state.activeEditCommentId}
        handleSubmit={this.handleSubmit}
        editComment={this.editComment}
        deleteComment={this.deleteComment}
        toggleEditComment={this.toggleEditComment}
        handlePostVoteClick={this.handlePostVoteClick}
        handleCommentVoteClick={this.handleCommentVoteClick}
      />
    )
  }
}


const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default withRouter(connect(mapStateToProps)(PostContainer));