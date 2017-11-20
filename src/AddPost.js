import React, {Component} from 'react';
import { classes } from './helpers';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Upload, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;








class AddPost extends Component {

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.setFormValues(values);
                this.props.form.resetFields();
            }

        });
    };



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={classes('postForm', this.props.className)} >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input a post title!' }],
                        })(
                            <Input placeholder="Post Title" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('body', {
                            rules: [{ required: true, message: 'Please input a post!' }],
                        })(
                            <TextArea placeholder="Post Body" autosize={{ minRows: 2, maxRows: 6 }}/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: 'Please input a category!' }],
                        })(
                            <Select placeholder="Select a category">
                                {this.props.categories.map(category => <Option value={category.name}>{category.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" />upload an Image
                            </Button>
                        </Upload>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">Submit your Post</Button>
                    </FormItem>
                </Form>
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