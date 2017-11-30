import React, {Component} from 'react';
import styled from 'styled-components';
import { Button} from 'antd'
import {Link} from 'react-router-dom';
import { classes } from './helpers';


class Home extends Component {
    render() {
        return (
            <div className={classes('Home', this.props.className)}>
                <Link to="/addPost/create"><Button className="add-post-button" icon="plus">Add a Post</Button></Link>
            </div>
        )
    }
}


export default styled(Home)`
    .add-post-button {
        background-color: #fff;
        border-color: #d9d9d9;
        border-radius: 2px;
        color: rgba(0, 0, 0, 0.45);
        width: 50%;
        height: 100px;
    }
`;