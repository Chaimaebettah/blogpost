import React from 'react';
import styled from 'styled-components';
import {Button, Row} from 'antd'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {classes} from '../helpers/index';
import Posts from '../containers/PostsContainer';

import {sortByVotes} from '../actions';


const Home = (props) => {

  const onClickSort = () => {
    props.dispatch(sortByVotes());
  };

  return (
    <div className={classes('Home', props.className)}>
      <Row>
        <Button onClick={onClickSort}>Sort By Votes</Button>
        <Posts/>
      </Row>
      <Link to="/addPost/create"><Button className="add-post-button" icon="plus">Add a Post</Button></Link>
    </div>
  )

};


const StyledHome = styled(Home)`
  .add-post-button {
    background-color: #fff;
    border-color: #d9d9d9;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;
    height: 100px;
  }
`;
export default connect(null)(StyledHome);