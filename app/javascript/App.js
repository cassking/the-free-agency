import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import PlayerContainer from './containers/PlayerContainer'
import PlayerShowContainer from './containers/PlayerShowContainer'
import TeamContainer from './containers/TeamContainer'
import TeamShowContainer from './containers/TeamShowContainer'
import Layout from './components/Layout'

const App = props => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={PlayerContainer} />
        <Route path="players/:id" component={PlayerShowContainer} />
        <Route path="/teams" component={TeamContainer} />
        <Route path="/teams/:id" component={TeamShowContainer} />
      </Route>
    </Router>
  )
}

export default App;
