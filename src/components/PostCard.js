import React from 'react';
import {Card, Col, Icon} from 'antd';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {classes} from '../helpers/index';
import {postVotes} from '../actions';
import {connect} from 'react-redux'


const PostCard = ({
  dispatch,
  id,
  category,
  className,
  deleteMyPost,
  image,
  title,
  body,
  commentCount,
  voteScore,
  author,
}) => {
  const handlePostVoteClick = (e) => {
    let vote = e.target.id;
    dispatch(postVotes(id, vote));
  };

  return (
    <Col span={8} className={classes('category', className)}>
      <Card style={{width: '340px', height: '300px'}} bodyStyle={{padding: 0}}>
        <Link to={`/posts/${category}/${id}`}>
          <div className="custom-image">
            <div className="close-icon">
              <Link to={`/addPost/${id}`}><Icon type="edit"/></Link>
              <Icon type="close" onClick={(e) => deleteMyPost(e)}/>
            </div>
            <img width="100%"
                 alt="post"
                 src={image}
            />
          </div>
          <div className="custom-card">
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
        </Link>
        <div className="post-footer">
          <div className="post-details">
            <p>Category: {category}</p>
            <p>author: {author}</p>
            {commentCount ? <p>{commentCount} Comments for this post</p> : null}
          </div>
          <div className="votes">
            <h4>
              <Icon type="like" id="upVote" onClick={handlePostVoteClick}/>
              <p>{voteScore}</p>
              <Icon type="dislike" id="downVote" onClick={handlePostVoteClick}/>
            </h4>
          </div>
        </div>
      </Card>

    </Col>
  )
}

const styledPostCard = styled(PostCard)`
  background: '#ECECEC'; 
  padding: '100px';
   
  .custom-image {
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
