import React, { Component } from 'react';
import { Card, Col, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { classes } from '../helpers/index';
import { postVotes } from '../actions';
import { connect } from 'react-redux'


class PostCard extends Component {
    handlePostVoteClick = (e) => {
        const postId = this.props.id;
        let id = e.target.id;
        this.props.dispatch(postVotes(postId,id));
    };


    render() {
        const postId = this.props.id;
        return (
            <Col span={8} className={classes('category', this.props.className)}>
                <Card style={{width: '340px', height: '300px'}} bodyStyle={{padding: 0}}>
                    <Link to={`/post/${postId}`}>
                        <div className="custom-image">
                            <div className="close-icon">
                                <Link to={`/addPost/${postId}`}><Icon type="edit"/></Link>
                                <Icon type="close" onClick={(e) => this.props.deleteMyPost(e)}/>
                            </div>
                            <img width="100%"
                                 src={this.props.image}/>
                        </div>
                        <div className="custom-card">
                            <h1>{this.props.title}</h1>
                            <p>{this.props.body}</p>
                        </div>
                    </Link>
                    <div className="post-footer">
                        <div className="post-details">
                            <p>Category: {this.props.category}</p>
                            <p>author: {this.props.author}</p>
                        </div>
                        <div className="votes">
                            <h4>
                                <Icon type="like" id="upVote" onClick={this.handlePostVoteClick}/>
                                <p>{this.props.voteScore}</p>
                                <Icon type="dislike" id="downVote" onClick={this.handlePostVoteClick}/>
                            </h4>
                        </div>
                    </div>
                </Card>

            </Col>
        )
    }
}

const styledPostCard = styled(PostCard)`
     background: '#ECECEC'; 
     padding: '100px';
     
     .custom-image{
        position: relative;
     }
     
    .custom-image img {
        display: block;
        max-height: 100px;

    }
    
    .custom-card {
        padding: 20px 16px;
    }
    
    .custom-card p {
        color: #999;
    }
     
    .close-icon {
        position: absolute;
        right: 2px;
        top: 2px;
        color: rgba(212, 212, 222, 0.98);
        font-size: 21px;
    }
    
    .post-footer {
        padding: 0 30px 0 20px;
        display: flex;
        justify-content: space-between;
    }
    
    .votes i {
        font-size: 16px;
        cursor: pointer;

    }
`;

export default connect(null)(styledPostCard);