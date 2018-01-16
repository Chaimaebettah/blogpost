import React from 'react';
import {Link, Route} from 'react-router-dom';
import {Menu, Icon} from 'antd';

import Category from '../components/Category'
import Post from '../containers/PostContainer'
import AddPost from '../components/AddPost'
import Home from '../components/Home'
import {classes} from '../helpers/index';

const App = ({className, categories, values, setFormValues}) => {
  return (
    <div className={classes('app', className)}>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Icon type="home"><Link to="/">home</Link></Icon>
        </Menu.Item>
        {categories.map(category => (
          <Menu.Item key={category.name}>
            <Link to={`/posts/${category.name}`}>{category.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <div>
        <Route exact path="/addPost/:id" render={(props) => (
          <AddPost
            {...props}
            categories={categories}
            values={values}
            setFormValues={setFormValues}
          />
        )}/>
        <Route exact path="/posts/:category" component={Category}/>
        <Route exact path="/posts/:category/:id" component={Post}/>
        <Route exact path="/" component={Home}/>

      </div>
    </div>
  )
}

export default App;