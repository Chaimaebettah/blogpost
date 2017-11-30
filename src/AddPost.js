import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { classes } from './helpers';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Upload, Select } from 'antd';
import {getPost} from "./helpers/request"
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;








class AddPost extends Component {

    state = {
        id: '',
        title: '',
        body: '',
        category: '',
        author: '',
        image:'',
        fireRedirect: false

    };

    componentDidMount() {
        const postId = this.props.match.params.id;
        if (postId === 'create') return;

        getPost(postId).then(({ title, body, category, author, image }) => {
            this.setState({
                id: postId,
                title,
                body,
                category,
                author,
                image,
            })
        })


    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.setFormValues(values);
                // we only want to reset the fields if we're adding a new post (there is no id value in the form values)
                if (!values.id) {
                    this.props.form.resetFields();
                }

            }

        });
        this.setState({ fireRedirect: true })

    };



    render() {

        const { getFieldDecorator } = this.props.form;
        const { fireRedirect } = this.state;

        return (
            <div className={classes('postForm', this.props.className)} >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    {/* we need this hidden input to add an id key to the form values if this is an edit form */}
                    {getFieldDecorator('id', { initialValue: this.state.id })(
                        <Input placeholder="id" type="hidden"/>
                    )}
                    <FormItem>
                        {getFieldDecorator('author', {
                            initialValue: this.state.author,
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('title', {
                            initialValue: this.state.title,
                            rules: [{ required: true, message: 'Please input a post title!' }],
                        })(
                            <Input placeholder="Post Title" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('body', {
                            initialValue: this.state.body,
                            rules: [{ required: true, message: 'Please input a post!' }],
                        })(
                            <TextArea placeholder="Post Body" autosize={{ minRows: 2, maxRows: 6 }}/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('category', {
                            initialValue: this.state.category,
                            rules: [{ required: true, message: 'Please input a category!' }],
                        })(
                            <Select placeholder="Select a category">
                                {this.props.categories.map(category => <Option value={category.name} key={category.name}>{category.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('image', {
                            initialValue: this.state.image,
                            rules: [{ required: true, message: 'Please upload an image!' }],
                        })(
                        <Upload name="image" action="//jsonplaceholder.typicode.com/posts/" listType="picture" >
                            <Button>
                                <Icon type="upload" />upload an Image
                            </Button>
                        </Upload>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Submit your Post</Button>
                    </FormItem>
                </Form>
                {fireRedirect && (
                    <Redirect to={'/home'}/>
                )}
            </div>
        )
    }
}

export default Form.create()(styled(AddPost)`
     background-color: #fbfbfb;
     padding: 30px 20px 10px 30px;
     border: 1px solid #d9d9d9;
     max-width: 500px;
     
     

    .login-form {
      max-width: 300px;
    }
`);