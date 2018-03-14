import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import PlayerContainer from './containers/PlayerContainer'


const App = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={PlayerContainer}>
      </Route>
    </Router>
  )
}

export default App;
