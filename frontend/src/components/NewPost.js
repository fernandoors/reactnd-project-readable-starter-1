import React, { Component } from 'react';
import { Button, Icon, Select, Input, message, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { formatPost, formatComment } from '../services/utils';
import { connect } from 'react-redux'
import { handleSavePost } from '../actions/posts';
import { handleSaveComment } from '../actions/comments';


const Option = Select.Option

class NewPost extends Component {
  state = {
    title: '',
    body: '',
    category: 'udacity'
  }
  componentDidUpdate(prevProps) {
    if (prevProps.editPost.id !== this.props.editPost.id) {
      return this.setState({
        title: this.props.editPost.title,
        body: this.props.editPost.body,
        category: this.props.editPost.category,
        id: this.props.editPost.id
      })
    }
    if (prevProps.editComment.id !== this.props.editComment.id) {
      return this.setState({
        body: this.props.editComment.body,
        id: this.props.editComment.id
      })
    }
  }

  handleNewPost = (post) => {
    const { title, body } = this.state
    if (title === '' && body === '') return message.warn(`Type a title and a body text`)
    if (title === '') return message.warn(`Type a title`)
    if (body === '') return message.warn(`Type a body text`)
    this.props.savePost(post)
    this.cleanInputs()
  }
  handleNewComment = (comment) => {
    const { body } = this.state
    if (body === '') return message.warn(`Type a body text`)
    this.props.saveComment(comment)
    this.cleanInputs()
  }
  cleanInputs = () => {
    this.props.handleEditPost()
    this.props.handleEditComment()
    this.setState({ title: '', body: '', category: 'udacity' })
  }
  render() {
    const { title, body, category, id } = this.state
    const { editPost, editComment, addComment } = this.props
    return (
      <div className='centerPost' id='edit'>
        <h2>{
          editPost ? 'Edit Post' :
          editComment ? 'Edit Comment' :
          addComment ? 'New Comment' : 'New Post'
        }</h2>
        {!!editPost || !addComment ? <Input
          placeholder="Insert a Title*"
          value={title}
          style={{ width: `400px`, marginBottom: `7px` }}
          onChange={e => this.setState({ title: e.target.value })}
        /> : null}

        <TextArea
          placeholder={`Insert a new ${!addComment ? 'post' : 'comment'}`}
          style={{ width: `400px`, marginBottom: `7px`, minHeight: '100px' }}
          value={body}
          onChange={e => this.setState({ body: e.target.value })}
        />

        <Row style={{ width: '400px' }}>
          {!!editPost || !addComment ? <Select value={category} style={{ width: 100, marginBottom: '12px', marginRight: `96px` }} onChange={(value) => this.setState({ category: value })}>
            {Object.values(this.props.categories).map(category =>
              <Option key={category.name} value={category.name}>{category.name}</Option>
            )}
          </Select> : null}
          <Button onClick={() => this.cleanInputs()}><Icon type='close' className='iconStyle' />Cancel</Button>
          <Button onClick={() => {
            if (editComment) this.handleNewComment(formatComment(body,  editComment.parentId, editComment.id))
            else if (addComment) this.handleNewComment(formatComment(body, addComment.id))
            else this.handleNewPost(formatPost(body, category, title, id))
          }
          }>
            <Icon type='save' className='iconStyle' />
            Save
          </Button>
        </Row>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    savePost: post => dispatch(handleSavePost(post)),
    saveComment: comment => dispatch(handleSaveComment(comment)),
  }
}
export default connect(null, mapDispatchToProps)(NewPost)