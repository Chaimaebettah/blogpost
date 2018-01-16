import React, {Component} from 'react';
import {connect} from 'react-redux';

import {deletePost} from '../actions'

import Posts from '../components/Posts';


class PostsContainer extends Component {

  getPosts = () => {
    const nextCategory = this.props.category;
    if (nextCategory) {
      return this.props.posts.filter(post => post.category === nextCategory)
    } else {
      return this.props.posts;
    }
  };

  deleteMyPost = (postId) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch(deletePost(postId))
  };

  render() {
    return (
      <Posts
        posts={this.getPosts()}
        deleteMyPost={this.deleteMyPost}
      />
    )
  }
}


const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps)(PostsContainer);