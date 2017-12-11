import React, { Component } from 'react';
import { Row } from 'antd';
import styled from 'styled-components';

import { classes } from '../helpers/index';
import Posts from '../containers/PostsContainer';


class Category extends Component {
    render() {
        const category = this.props.match.params.category;
        return (
            <div className={classes('category', this.props.className)}>
                <Row>
                    <Posts category={category} />
                </Row>
            </div>
        )
    }
}

export default styled(Category)``;