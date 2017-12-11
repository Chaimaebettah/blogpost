import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllPosts, getAllCategoryPosts, deletePost } from '../actions'

import Posts from '../components/Posts';


class PostsContainer extends Component {

    getPosts = (category) => {
        const nextCategory = category || this.props.category;
        if (this.props.category && nextCategory) {
            this.props.dispatch(getAllCategoryPosts(nextCategory))
        } else {
          this.props.dispatch(getAllPosts());
        }
    };

    componentDidMount() {
        this.getPosts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category !== this.props.category) {
            const category = nextProps.category;
            this.getPosts(category);
        }
    }

    deleteMyPost = (postId) => (e) => {
        e.preventDefault();
        e.stopPropagation();
      this.props.dispatch(deletePost(postId))
    };

    render() {
        return (
            <Posts
                posts={this.props.posts}
                getPosts={this.getPosts}
                deleteMyPost={this.deleteMyPost}
            />
        )
    }
}



const mapStateToProps = (state) => ({
    posts: state.posts
});

export default connect(mapStateToProps)(PostsContainer);