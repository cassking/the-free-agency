import React, { Component } from 'react';
import TeamShow from '../components/TeamShow';
import PlayerTile from '../components/PlayerTile'

class TeamShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {},
      players: []
    }
  }

  componentWillMount() {
    let teamId = this.props.params.id
    fetch(`/api/v1/teams/${teamId}`)
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(body => {
      this.setState({ team: body['team'], players: body['players'] })
    })
  }

  render() {
    let players = this.state.players.map(player => {
      return(
        <PlayerTile
          key={player.id}
          id={player.id}
          first_name={player.firfirst_name}
          last_name={player.last_name}
          avatar_url={player.avatar_url}
        />
      )
    })
    return(
      <div>
        <TeamShow
          key={this.state.team.id}
          id={this.state.team.id}
          name={this.state.team.name}
        />
        {players}
      </div>
    )
  }
}

export default TeamShowContainer;
