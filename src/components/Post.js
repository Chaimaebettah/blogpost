import React from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Icon } from 'antd'
import { Link } from 'react-router-dom'



import { classes, convertedTimeStamp } from '../helpers/index';

import PostCommentForm from '../components/PostCommentForm';

const Post = ({
    className,
    author,
    timestamp,
    title,
    body,
    image,
    commentCount,
    comments,
    voteScore,
    commentForm,
    activeEditCommentId,
    handlePostVoteClick,
    editComment,
    toggleEditComment,
    deleteComment,
    handleCommentVoteClick,
    handleSubmit,
    deletePost,
    id,
}) => {

  return (
  <div className={classes('Post', className)}>
            <Row type="flex" justify="end">
                <Col span={4} >
                    <div className="close-edit-icons">
                        <Link to={`/addPost/${id}`}><Icon type="edit"/></Link>
                        <Icon type="close" onClick={deletePost(id)}/>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={12}>
                    <h3>Author Name: <span className="author">{author}</span></h3>
                    <h4 className="post-date">{convertedTimeStamp(timestamp)}</h4>
                    {commentCount ? <p>{commentCount} Comments for this post</p> : null}
                    <div className="post-body">
                        <h1> {title}</h1>
                        <img className="post-image" src={image} alt=""/>
                        <h3>{body}</h3>
                        <div className="post-votes">
                            <h4>
                                <Icon type="like" id="upVote" onClick={handlePostVoteClick}/> {voteScore}
                                <Icon type="dislike" id="downVote" onClick={handlePostVoteClick}/>
                            </h4>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col>
                    {comments && comments.map((comment) => (
                        <Card className="comments-card" key={comment.id}>
                            {activeEditCommentId === comment.id ?
                                <PostCommentForm
                                    handleSubmit={editComment}
                                    onCancel={toggleEditComment}
                                    commentId={comment.id}
                                    author={comment.author}
                                    comment={comment.body}
                                    mode="edit"
                                />
                                :
                                <div>
                                    <div className="close-edit-icons">
                                        <Icon type="edit" onClick={() => (toggleEditComment(comment.id))}/>
                                        <Icon type="close" onClick={() => (deleteComment(comment.parentId, comment.id))}/>
                                    </div>
                                    <h3 style={{color: '#02B875'}}>{comment.author}</h3>
                                    <p>{convertedTimeStamp(comment.timestamp)}</p>
                                    <p>{comment.body}</p>

                                    <div className="vote-icons">
                                        <h5>
                                            <Icon id="upVote" type="like" onClick={(e) => {handleCommentVoteClick(e,comment.id)}}/>
                                            <span>{comment.voteScore}</span>
                                            <Icon id="downVote" type="dislike"  onClick={(e) => {handleCommentVoteClick(e,comment.id)}}/>
                                        </h5>
                                    </div>
                                </div>
                            }

                        </Card>

                    ))}
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={12}>
                    <PostCommentForm
                        handleSubmit={handleSubmit}
                        commentId={commentForm.id}
                        author={commentForm.author}
                        comment={commentForm.comment}
                    />
                </Col>
            </Row>

        </div>
    )
}


const StyledPost = styled(Post)`
    .comments-card {
        position: relative;
        width: 630px;
        padding: 0 20px;
        margin-bottom: 20px;
        
    }
    
    
    .close-edit-icons {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor : pointer;
        font-size: 16px; 
    }
    
    .post-image {
        min-width: 600px;
        max-height: 400px;
    }
    
    .comment-form input{
        border-top: none;
        border-right: none;
        border-left: none;
        
    }
    
    .comment-form textarea{
        border-top: none;
        border-right: none;
        border-left: none;
    
    }
    
    .comment-form {
        border: 1px solid #e9e9e9;
        padding: 20px;
        margin-top: 40px;
    }
    
    .comment-form textarea:focus, input:focus{
        outline: none;
    }
    
    .post-date {
        color: #7b7070;
    }
    
    .author {
        margin-top: 30px;
        color: #02B875
    }
    
    .post-body {
        margin: 60px 0;
    }
    
    .ant-input:focus {
        box-shadow: none;
        border-color: transparent;
    }
    
    .vote-icons {
        position: absolute;
        right: 13px;
        font-size: 16px;
        bottom: 5px;
        cursor: pointer;
    }
    
    
    .post-votes {
        margin: 40px 0;
    }
    
    .post-votes i{
        font-size: 16px;
        cursor: pointer;

    }

`;


export default StyledPost;