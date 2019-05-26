import React, { Component } from 'react'
import { connect } from 'react-redux';
import ListPosts from './ListPosts';
import NewPost from './NewPost';
import { handlePostComment } from '../actions/comments';
// import ListComments from './ListComments';

class Dashboard extends Component {
  state = {
    handleCommentView: false,
    sortPost: [],
    editPost: '',
    editComment: ''
  }
  componentDidMount() {
    if (this.props.posts) this.setState({ sortPost: this.props.posts })
    if (this.props.match.params.post_id !== undefined)
      this.props.getComments(this.props.match.params.post_id)
  }
  componentDidUpdate(prevProps) {
    const { params } = this.props.match
    if (params.post_id !== undefined
      && params.post_id !== prevProps.match.params.post_id) {
      return this.props.getComments(params.post_id)
    }
    if (params.post_id !== prevProps.match.params.post_id)
      return this.props.getComments('')
  }

  render() {
    const { categories, posts, comments } = this.props
    const { handleCommentView, editPost, editComment } = this.state
    const filterPost = Object.values(posts).filter(post => post.id === this.props.match.params.post_id)
    return (
      <>
        <NewPost
          categories={categories}
          commentView={!handleCommentView}
          editPost={editPost}
          editComment={editComment}
          addComment={filterPost[0]}
          handleEditPost={() => this.setState({ editPost: '', editComment: '' })}
          handleEditComment={() => this.setState({ editPost: '', editComment: '' })}
        />
        <hr />
        {posts &&
          <ListPosts
            posts={!filterPost.length ? posts : { ...filterPost }}
            handleEditPost={post => this.setState({ editPost: post, editComment: '' })}
          />
        }
        {Object.values(comments).length !== 0 &&
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) 