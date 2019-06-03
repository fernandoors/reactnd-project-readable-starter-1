import React, { Component } from 'react';
import { connect } from 'react-redux'
import ListPosts from './ListPosts';
import { Redirect } from 'react-router-dom'
import { OrderPosts } from './OrderPosts';
import { handleOrderPost, loadPost } from '../actions/posts';


class Categories extends Component {
  state = {
    page: '/not-found',
    isRedirect: false,
  }
  componentDidMount = async () => {
    await this.props.loadPost()
  }
  render() {
    const { posts, match } = this.props
    const { page, isRedirect } = this.state
    const postFiltered = posts.filter(data => {
      if(data.category) return data.category.includes(match.params.categories)
      return null
    })
    if (postFiltered.length === 0 || isRedirect) return <Redirect to={page} />
    return (
      <>
        <OrderPosts
          changeOrder={(data) => this.props.orderPosts(data)}
        />
        {posts &&
          <ListPosts
            posts={postFiltered}
            handleEditPost={post => this.setState({ page: `/${post.category}/${post.id}`, isRedirect: true })}
          />
        }
      </>
    )
  }
}


function mapStateToProps({ posts }) {
  return {
    posts,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadPost: () => dispatch(loadPost()),
    orderPosts: order => dispatch(handleOrderPost(order)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories)
