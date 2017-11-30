import React, {Component} from 'react';
import {getPost, AddComment, getComments} from './helpers/request';
import {classes} from './helpers';
import {Row, Col, Form, Input, Button, Card} from 'antd'

const FormItem = Form.Item;
const {TextArea} = Input;


class Post extends Component {
    state = {
        title: '',
        author: '',
        body: '',
        time: '',
        category: '',
        image: '',
        comments: [],


    };

    componentWillUpdate() {
        const postId = this.props.match.params.id;
        getPost(postId).then(response => {
            getComments(postId).then(comments => {
                this.setState({
                    title: response.title,
                    author: response.author,
                    body: response.body,
                    time: response.timestamp,
                    category: response.category,
                    image: response.image,
                    comments,
                });


            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('comment values of form: ', values.author);

                const nextValues = {};
                nextValues.id = Math.floor(Math.random() * 200000);
                nextValues.timestamp = Date.now();
                nextValues.parentId = this.props.match.params.id;
                nextValues.body = values.comment;
                nextValues.author = values.author;
                AddComment(nextValues).then(response => {
                    console.log('responseeee' + response.body);
                    const nextState = {...this.state};
                    nextState.comments.push(values.comment)
                    this.setState(nextState);
                    console.log('afterthis' + this.state.comments)


                })
            }

        });
    };


    render() {
        // console.log('hhhhh'+this.state.comments);
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={classes('Post', this.props.className)}>
                <Row type="flex" justify="center">
                    <Col span={12}>
                        <h4>{this.state.author}</h4>
                        <h4>{this.state.category}</h4>
                        <h4>{this.state.time}</h4>
                        <h1> {this.state.title}</h1>
                        <h3>{this.state.body}</h3>
                        <img src={this.state.image} alt=""/>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col>
                        {this.state.comments.map((comment) => (
                            <Card style={{width: 500, padding: '0 20px', marginBottom: '20px'}} key={comment.id}>
                                <h1>{this.state.author}</h1>
                                {comment.body}

                            </Card>

                        ))}
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={12}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('author', {
                                    initialValue: this.state.author,
                                })(
                                    <Input placeholder="Enter Username" name="author"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('comment', {
                                    initialValue: this.state.comment,
                                })(
                                    <div>
                                        <TextArea placeholder="Add a Comment" autosize={{minRows: 2, maxRows: 6}}/>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">Submit your Post</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default Form.create()(Post);