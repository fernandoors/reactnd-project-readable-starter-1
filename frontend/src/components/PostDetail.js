import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import ListPosts from './ListPosts';
import NewPost from './NewPost';
import { handlePostComment } from '../actions/comments';
import NewComment from './NewComment';
import { loadPostById } from '../actions/posts';

class PostDetail extends Component {
  state = {
    sortPost: [],
    editPost: '',
    editComment: '',
    redirectPage: false,
    page: '/not-found'
  }
  componentDidMount = async () => {
    await this.props.loadPostById(this.props.match.params.post_id)
    this.props.getComments(this.props.match.params.post_id)
  }
  componentDidUpdate(prevProps) {
    const { params } = this.props.match
    if (params.post_id !== undefined
      && params.post_id !== prevProps.match.params.post_id) {
      return this.props.getComments(params.post_id)
    }
    if (params.post_id !== prevProps.match.params.post_id) {
      return this.props.getComments('')
    }
    if (this.props.posts.length !== 0 && prevProps.posts.length === 0) {
      // post not found
      if(Object.keys(...this.props.posts).length === 0){
      this.setState({ redirectPage: true })
    }}
    if (this.props.posts.length === 0 && prevProps.posts.length !== 0) {
      // delete post
      this.setState({ redirectPage: true, page: '/' })
    }
  }

  render() {
    const { categories, posts, comments } = this.props
    const { editPost, editComment, redirectPage, page } = this.state
    if (redirectPage) return <Redirect to={page} />
    return (
      <>
        {editPost && <NewPost
          categories={categories}
          editPost={editPost}
          handleEditPost={() => this.setState({ editPost: '', editComment: '' })}
        />}
        {!editPost && <NewComment
          editComment={editComment}
          addComment={posts}
          handleEditComment={() => this.setState({ editComment: '' })}
        />}
        <hr />
        {posts.length !== 0 && <ListPosts
          posts={posts}
          handleEditPost={post => this.setState({ editPost: post, editComment: '' })}
        />}

        {comments.length !== 0 &&
          <ListPosts
            comments={comments}
            handleEditComment={comment => this.setState({ editPost: '', editComment: comment })}
          />
        }
      </>
    )
  }
}

const mapStateToProps = ({ posts, categories, comments, order }) => {
  return {
    posts,
    categories,
    comments,
    order
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getComments: id => dispatch(handlePostComment(id)),
    loadPostById: id => dispatch(loadPostById(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail) 