import React, { Component } from 'react';
import { Button, Icon, message, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { formatComment } from '../services/utils';
import { connect } from 'react-redux'
import { handleSaveComment } from '../actions/comments';


class NewComment extends Component {
  state = {
    body: '',
  }
  componentDidUpdate(prevProps) {
    if (prevProps.editComment.id !== this.props.editComment.id) {
      return this.setState({
        body: this.props.editComment.body,
        id: this.props.editComment.id
      })
    }
  }

  handleNewComment = (comment) => {
    const { body } = this.state
    if (body === '') return message.warn(`Type a body text`)
    this.props.saveComment(comment)
    this.cleanInputs()
  }
  cleanInputs = () => {
    this.props.handleEditComment()
    this.setState({  body: '' })
  }
  render() {
    const { body } = this.state
    const { editComment, addComment } = this.props
    return (
      <div className='centerPost' id='edit'>
        <h2>{
          editComment ? 'Edit Comment' : 'New Comment' 
        }</h2>

        <TextArea
          placeholder='Insert a new comment'
          style={{ width: `400px`, marginBottom: `7px`, minHeight: '100px' }}
          value={body}
          onChange={e => this.setState({ body: e.target.value })}
        />

        <Row style={{ width: '400px' }}>
         
          <Button onClick={() => this.cleanInputs()}><Icon type='close' className='iconStyle' />Cancel</Button>
          <Button onClick={() => {
            if (editComment) this.handleNewComment(formatComment(body, editComment.parentId, editComment.id))
            else if (addComment) this.handleNewComment(formatComment(body, addComment[0].id))
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
    saveComment: comment => dispatch(handleSaveComment(comment)),
  }
}
export default connect(null, mapDispatchToProps)(NewComment)