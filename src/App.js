import React, {Component} from 'react';
import styled from 'styled-components';
import {Link, Route} from 'react-router-dom'
import Category from './Category'
import Post from './Post'
import AddPost  from './AddPost'
import Home  from './Home'
import {classes} from './helpers';


import { getCategories, addPosts } from './helpers/request';




import {Menu, Icon} from 'antd';


import './App.css';

class App extends Component {
    state = {
        categories: [],
        values: ''
    };

    getAllCategories = () => {
        getCategories().then(response => {
            this.setState({
                categories: response.categories
            })
        })
    };

    componentWillMount() {
        getCategories().then(response => {
            this.setState({
                categories: response.categories
            })
        })
    }


    getCategories = () => {
        getCategories().then(response => {
            this.setState({
                categories: response.categories
            })
        })
    };

    componentDidMount(){
        this.getCategories();
    }

    setFormValues = (values) => {
         this.setState ({ values: values });
        const nextValues = { ...values };
        nextValues.timestamp = Date.now();
        nextValues.id = Math.floor(Math.random() * 200000);
        addPosts(nextValues).then(response => {
            console.log(response);
        })
    };





    render() {
        return (
            <div className={classes('app', this.props.className)}>
                <Menu mode="horizontal">
                    <Menu.Item key="heart">
                        <Icon type="heart"><Link to="/home">Add a post</Link></Icon>
                    </Menu.Item>
                    {this.state.categories.map(category => (
                        <Menu.Item key={category.name}>
                            <Link to={`/posts/${category.name}`}>{category.name}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
                <div>
                    <Route exact path="/addPost"  render={ () => (
                        <AddPost
                            categories={this.state.categories}
                            values={this.state.values}
                            setFormValues={this.setFormValues}
                            getCategories={this.getCategories}
                        />
                    ) } />
                    <Route exact path="/posts/:category"  component={Category}/>
                    <Route exact path="/post/:id"  component={Post}/>
                    <Route exact path="/home"  component={Home}/>
                </div>

            </div>


        );
    }
}

export default App;
