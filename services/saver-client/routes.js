import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Saver from './containers/Saver'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import InsertPage from './containers/InsertPage'

export default (
  <Route path="/saver" component={Saver}>
  </Route>
  /*
  <Route path="/" component={App}>
    <Route path="/insert/:login"
           component={InsertPage} />
    <Route path="/old/:login/:name"
           component={RepoPage} />
    <Route path="/old/:login"
           component={UserPage} />
  </Route>
  */
)
