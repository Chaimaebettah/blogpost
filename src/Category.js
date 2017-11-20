import React, { Component } from 'react';
import PostCard from './PostCard'
import { Row } from 'antd';
import styled from 'styled-components';
import { getCategoryPosts } from './helpers/request';
import { classes } from './helpers';



class Category extends Component {
    state = {
        posts: [],
    };


    getPosts = (category) => {
        getCategoryPosts(category).then(response => {
            this.setState({
                posts: response
            })
        })
    };



    componentDidMount() {
        const category = this.props.match.params.category;
        this.getPosts(category);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.category !== this.props.match.params.category) {
            const category = nextProps.match.params.category;
            this.getPosts(category);
        }
    }

    render() {
        // console.log( 'hadi li berit daba '+this.state.posts);
        return (
            <div className={classes('category', this.props.className)}>
                <Row>
                    {this.state.posts.map(post => <PostCard key={post.id} {...post}/>)}
                </Row>
            </div>
        )
    }
}

export default styled(Category)`


`;