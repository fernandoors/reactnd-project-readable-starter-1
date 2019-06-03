import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch,  } from 'react-router-dom'

import Categories from './Categories'
import PageNotFound from './PageNotFound'
import Dashboard from './Dashboard';
import PostDetail from './PostDetail';
import Header from './Header';
import Footer from './Footer';
import { handleInitialData } from '../actions/shared';

class App extends Component {
  state = {
    routeCategories: ``
  }
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    return (
      <Router>
        <Header categories={this.props.categories} />
       <Switch>
        <Route exact path='/not-found' component={PageNotFound} />
        <Route exact path="/:categories" component={Categories} />
        <Route exact path="/:categories/:post_id" component={PostDetail} />
        <Route exact path="/" component={Dashboard} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}
const mapStateToProps = ({ posts, categories, order }) => {
  return {
    posts,
    categories,
    order,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleInitialData: () => dispatch(handleInitialData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
