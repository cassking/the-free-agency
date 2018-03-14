import React, { Component } from 'react';
import PlayerTile from '../components/PlayerTile';


class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  render() {
    let players = this.state.players.map(player => {
      return(
        <PlayerTile
          key={player.id}
          id={player.id}
          first_name={player.first_name}
          last_name={player.last_name}
        />
      )
    })
    return(
      <div>
        <h1>Hi.</h1>
      </div>
    )
  }
}

export default PlayerContainer;
