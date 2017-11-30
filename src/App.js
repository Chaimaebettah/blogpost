import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom'
import Category from './Category'
import Post from './Post'
import AddPost  from './AddPost'
import Home  from './Home'
import {classes} from './helpers';


import { getCategories, addPosts, editPost } from './helpers/request';




import {Menu, Icon} from 'antd';


import './App.css';

class App extends Component {
    state = {
        categories: [],
        values: '',
        comment:''
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

        // if there is already an id in the form values, we need to call the editPost request helper
        if (values.id) {
            editPost(values, values.id).then(response => {
                console.log(response);
            });
            return false;
        }

        nextValues.id = Math.floor(Math.random() * 200000);
        nextValues.timestamp = Date.now();
        nextValues.image = values.image.file.thumbUrl;
        addPosts(nextValues).then(response => {
            console.log(response);
        })
    };


       // setComments = (comment) => {
    //     this.setState({ comment: comment});
    //     const nextValues = { ...comment };
    //     nextValues.timestamp = Date.now();
    //     AddComment(nextValues).then(response => {
    //         console.log(response);
    //     })
    // };




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
                    <Route exact path="/addPost/:id" render={ (props) => (
                        <AddPost
                            {...props}
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
