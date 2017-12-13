import React from 'react';
import PostCard from '../components/PostCard'
import { Row } from 'antd';
import { classes } from '../helpers/index';

const Posts = ({ className, posts, deleteMyPost }) => {
    return (
        <div className={classes('category', className)}>
            <Row>
                {posts.length ?
                    posts.map(post => <PostCard key={post.id} {...post} deleteMyPost={deleteMyPost(post.id)}/>)
                    : <h2>There is no post in this category</h2>}
            </Row>
        </div>
    )
}

export default Posts;