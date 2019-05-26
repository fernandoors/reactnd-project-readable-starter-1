import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch,  } from 'react-router-dom'

import Categories from './Categories'
import PageNotFound from './PageNotFound'
import Dashboard from './Dashboard';
// import ListComments from './ListComments';
import Header from './Header';
import Footer from './Footer';
import { handleInitialData } from '../actions/shared';

class App extends Component {
  state = {
    routeCategories: ``
  }
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Header categories={this.props.categories} />
       <Switch>
        <Route exact path='/not-found' component={PageNotFound} />
        <Route exact path="/:categories" component={Categories} />
        <Route exact path="/:categories/:post_id" component={Dashboard} />
        <Route exact path="/" component={Dashboard} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}
const mapStateToProps = ({ posts, categories, comments, order }) => {
  return {
    posts,
    categories,
    comments,
    order,
  }
}

export default connect(mapStateToProps)(App)
