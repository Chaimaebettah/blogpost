import React from 'react';
import {Form, Input, Button} from 'antd'

const FormItem = Form.Item;
const {TextArea} = Input;

const PostCommentForm = ({
  handleSubmit,
  onCancel,
  commentId,
  author,
  comment,
  form,
  mode
}) => {
  const {getFieldDecorator} = form;

  return (
    <Form onSubmit={handleSubmit(form)}>
      <div className="comment-form">
        <FormItem>
          {getFieldDecorator('id', {initialValue: commentId})(
            <Input placeholder="id" type="hidden"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('author', {
            initialValue: author,
            rules: [{required: true, message: 'Please enter a username!'}],
          })(
            <Input placeholder="Enter Username" name="author"/>
          )}
        </FormItem>
        <FormItem>
          <div>
            {getFieldDecorator('comment', {
              initialValue: comment,
              rules: [{required: true, message: 'Please add a comment!'}],
            })(
              <TextArea placeholder="Add a Comment" autosize={{minRows: 2, maxRows: 6}}/>
            )}
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Publish</Button>
          {mode === "edit" && <Button type="secondary" onClick={onCancel}>Cancel</Button>}
        </FormItem>
      </div>
    </Form>
  )
};

export default Form.create()(PostCommentForm);