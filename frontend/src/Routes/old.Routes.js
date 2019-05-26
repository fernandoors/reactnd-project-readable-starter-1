import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Categories from './Categories'
// import ListPosts from './ListPosts'
import PageNotFound from './PageNotFound'
import Dashboard from './Dashboard';
import Header from './Header';
import Footer from './Footer';

export const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/:categories" component={Categories} />
        <Route exact path="/:categories/:post_id" component={Categories} />
        <Route exact path="/" component={Dashboard} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </ Router>
  )
}