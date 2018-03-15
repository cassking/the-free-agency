import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import PlayerContainer from './containers/PlayerContainer'
import PlayerShowContainer from './containers/PlayerShowContainer'
import 'whatwg-fetch';

const App = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={PlayerContainer} />
        <Route path="players/:id" component={PlayerShowContainer} />
      </Route>
    </Router>
  )
}

export default App;
