import React, { Component } from 'react';
import { Button, Icon, Select, Input, message, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { formatPost } from '../services/utils';
import { connect } from 'react-redux'
import { handleSavePost } from '../actions/posts';


const Option = Select.Option

class NewPost extends Component {
  state = {
    title: '',
    body: '',
    category: 'udacity'
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.editPost !== '' && prevState.title === '') {
      return this.setState({
        title: this.props.editPost.title,
        body: this.props.editPost.body,
        category: this.props.editPost.category,
        id: this.props.editPost.id
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
  
  cleanInputs = () => {
    this.props.handleEditPost()
    this.setState({ title: '', body: '', category: 'udacity' })
  }
  render() {
    const { title, body, category, id } = this.state
    const { editPost } = this.props
    return (
      <div className='centerPost' id='edit'>
        <h2>{
          editPost ? 'Edit Post' : 'New Post'
        }</h2>
         <Input
          placeholder="Insert a Title"
          value={title}
          style={{ width: `400px`, marginBottom: `7px` }}
          onChange={e => this.setState({ title: e.target.value })}
        /> 

        <TextArea
          placeholder='Insert a new post'
          style={{ width: `400px`, marginBottom: `7px`, minHeight: '100px' }}
          value={body}
          onChange={e => this.setState({ body: e.target.value })}
        />

        <Row style={{ width: '400px' }}>
          <Select value={category} style={{ width: 100, marginBottom: '12px', marginRight: `96px` }} onChange={(value) => this.setState({ category: value })}>
            {this.props.categories.map(category =>
              <Option key={category.name} value={category.name}>{category.name}</Option>
            )}
          </Select> 
          <Button onClick={() => this.cleanInputs()}><Icon type='close' className='iconStyle' />Cancel</Button>
          <Button onClick={() => {
            if (editPost) this.handleNewPost(formatPost(body, category, title, id))
            else this.handleNewPost(formatPost(body, category, title))
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
  }
}
export default connect(null, mapDispatchToProps)(NewPost)