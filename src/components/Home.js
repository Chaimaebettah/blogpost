import React, {Component} from 'react';
import styled from 'styled-components';
import { Button, Row} from 'antd'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { classes } from '../helpers/index';
import Posts from '../containers/PostsContainer';

import { sortByVotes } from '../actions';


class Home extends Component {

    onClickSort = () => {
      this.props.dispatch(sortByVotes());
    }

    render() {
        return (
            <div className={classes('Home', this.props.className)}>
                <Row>
                  <Button onClick={this.onClickSort}>Sort By Votes</Button>
                    <Posts />
                </Row>
                <Link to="/addPost/create"><Button className="add-post-button" icon="plus">Add a Post</Button></Link>
            </div>
        )
    }
}


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