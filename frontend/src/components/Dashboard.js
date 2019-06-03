import React, { Component } from 'react'
import { connect } from 'react-redux';
import ListPosts from './ListPosts';
import NewPost from './NewPost';
import { handleOrderPost,  loadPost } from '../actions/posts';
import { OrderPosts } from './OrderPosts';


class Dashboard extends Component {
  state = {
    sortPost: [],
    editPost: '',
  }
  componentDidMount = async() =>{
    await this.props.loadPost()
  }
  render() {
    const { categories, posts } = this.props
    const { editPost } = this.state
    return (
      <>
        <NewPost
          categories={categories}
          editPost={editPost}
          handleEditPost={() => this.setState({ editPost: '' })}
        />
        <hr />
        <OrderPosts
          changeOrder={(data)=> this.props.orderPosts(data)}
        />
        {posts.length !==0 &&
          <ListPosts
            posts={this.props.posts}
            handleEditPost={post => this.setState({ editPost: post })}
          />
        }
      </>
    )
  }
}

const mapStateToProps = ({ posts, categories, order }) => {
  return {
    posts,
    categories,
    order
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadPost: () => dispatch(loadPost()),
    orderPosts: order => dispatch(handleOrderPost(order)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) 