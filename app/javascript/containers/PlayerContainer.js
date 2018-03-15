import React, { Component } from 'react';
import PlayerTile from '../components/PlayerTile';


class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/players')
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(players => {
      this.setState({ players: players})
    })
  }

  render() {
    let players = this.state.players.map(player => {
      return(
        <PlayerTile
          key={player.id}
          id={player.id}
          first_name={player.first_name}
          last_name={player.last_name}
          avatar_url={player.avatar_url}
        />
      )
    })
    return(
      <div>
        {players}
      </div>
    )
  }
}

export default PlayerContainer;
