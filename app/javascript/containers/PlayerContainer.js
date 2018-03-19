import React, { Component } from 'react';
import PlayerTile from '../components/PlayerTile';
import Search from '../components/Search';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      all_players: []
    }
    this.searchPlayers = this.searchPlayers.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/players')
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(players => {
      this.setState({
        players: players,
        all_players: players
      })
    })
  }

  searchPlayers(query){
    if(query){
      let results = this.state.players.filter((player) => {
        return player.last_name.toLowerCase().includes(query) || player.first_name.toLowerCase().includes(query)
      });
      this.setState({ all_players: results })
    } else {
      this.setState({ players: this.state.players })
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
          avatar_url={player.avatar_url}
        />
      )
    })
    return(
      <div>
        <div className="search-container">
          <Search searchPlayers={this.searchPlayers}/>
        </div>
        {players}
      </div>
    )
  }


}

export default PlayerContainer;
