import React, { Component } from 'react';
import { Select, Modal, Row } from 'antd';
import { connect } from 'react-redux'
import CardView from './CardView'
import { handleVotePost, handleDeletePost, handleOrderPost } from '../actions/posts';
import { handlePostComment, handleDeleteComment, handleVoteComment } from '../actions/comments';

const Option = Select.Option
const confirm = Modal.confirm;


class ListPosts extends Component {
  state = {
    value: false
  }

  collectComments = (id) => {
    this.props.getComments(id)
  }

  setVote = async (id, params, isComment = false) => {
    if (isComment) return this.props.voteComments(id, { "option": params })
    this.props.votePost(id, { "option": params })
  }

  handleDeleteModal = (title, id, deletePost) => {
    confirm({
      title: 'Are you sure delete this post?',
      content: "Title: " + title,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() { deletePost(id) }
    });
  }

  render() {
    return (
      <div className='centerPost'>
        {!this.props.comments
          && <Row>
            <Select placeholder='Order by'
              style={{ width: 120 }}
              onChange={(opt) => this.props.orderPosts(opt)}
            >
              <Option value="date">Date</Option>
              <Option value="more">More Vote</Option>
              <Option value="less">Less Vote</Option>
            </Select>
          </Row>

        }
        {!this.props.posts && <h4>Comments</h4>}
        <ul style={{ padding: 0 }} >
          {!this.props.comments
            ? Object.values(this.props.posts).map(post => (
              <CardView
                key={post.id}
                post={post}
                setVote={(id, type) => this.setVote(id, type)}
                collectComments={(id) => this.collectComments(id)}
                handleEditPost={(post) => this.props.handleEditPost(post)}
                handleDeleteModal={(title, id) => this.handleDeleteModal(title, id, this.props.deletePost)}
                style={{ width: '400px', margin: '15px 0' }}
              />))
            : Object.values(this.props.comments).map(post => (
              <CardView
                key={post.id}
                post={post}
                setVote={(id, type) => this.setVote(id, type, true)}
                handleEditComment={(post) => this.props.handleEditComment(post, post.parentId)}
                handleDeleteModal={(body, id) => this.handleDeleteModal(body, id, this.props.deleteComments)}
                style={{ width: '400px', margin: '15px 0' }}
              />))
          }
        </ul>
      </div>
    )
  }

}
const mapDispatchToProps = dispatch => {
  return {
    votePost: (id, params) => dispatch(handleVotePost(id, params)),
    orderPosts: order => dispatch(handleOrderPost(order)),
    deletePost: id => dispatch(handleDeletePost(id)),
    getComments: id => dispatch(handlePostComment(id)),
    deleteComments: id => dispatch(handleDeleteComment(id)),
    voteComments: (id, params) => dispatch(handleVoteComment(id, params)),
  }
}
export default connect(null, mapDispatchToProps)(ListPosts)