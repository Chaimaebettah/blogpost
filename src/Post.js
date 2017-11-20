import React, {Component} from 'react';
import { getPost } from './helpers/request';
import {classes} from './helpers';
import { Row, Col } from 'antd'




class Post extends Component {
    state = {
        title: '',
        author: '',
        body: '',
        time: '',
        category: '',



    };

    componentWillMount() {
        const postId = this.props.match.params.id;
        getPost(postId).then(response => {
            console.log('reddddddddddds'+response);
            this.setState({
                title: response.title,
                author: response.author,
                body: response.body,
                time: response.timestamp.toString(),
                category: response.category,
            })
        })
    }

    render() {
        return (
            <div className={classes('Post', this.props.className)}>
                <Row type="flex" justify="center">
                    <Col span={12}>
                        <h4>{this.state.author}</h4>
                        <h4>{this.state.category}</h4>
                        <h4>{this.state.time}</h4>
                        <h1> {this.state.title}</h1>


                        <h3>{this.state.body}</h3>



                    </Col>
                </Row>

            </div>
        )
    }
}

export default Post;