import React, { Component } from 'react';
import { connect } from 'react-redux'
import ListPosts from './ListPosts';
import { Redirect } from 'react-router-dom'


class Categories extends Component {

  render() {
    const { posts, match } = this.props
    const postFiltered = Object.values(posts).filter(data => data.category.includes(match.params.categories))
    if (postFiltered.length === 0) return <Redirect to='/not-found' />
    return (
      <>
        {posts &&
          <ListPosts
            posts={postFiltered}
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
export default connect(mapStateToProps)(Categories)
