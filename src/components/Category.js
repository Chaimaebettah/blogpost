import React from 'react';
import {Row} from 'antd';
import styled from 'styled-components';

import {classes} from '../helpers/index';
import Posts from '../containers/PostsContainer';


const Category = (props) => {

  const category = props.match.params.category;
  return (
    <div className={classes('category', props.className)}>
      <Row>
        <Posts category={category}/>
      </Row>
    </div>
  )

};

export default styled(Category)``;