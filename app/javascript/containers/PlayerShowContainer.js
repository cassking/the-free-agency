import React, { Component } from 'react';
import PlayerShow from '../components/PlayerShow';
import StatsTile from '../components/StatsTile';
import CommentsContainer from './CommentsContainer';

class PlayerShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      stat: {},
      signed_in: false,
      team_name: '',
      team_id: 0
    }
  }

  componentDidMount(){
    this.getShowData();
  }
  getShowData(){
    let playerId = this.props.params.id
    fetch(`/api/v1/players/${playerId}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        let parsed = response.json()
       return parsed
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(body => {
      this.setState({
        player: body['player'],
        stat: body['stat'],
        signed_in: body['signed_in'],
        team_name: body['team_name'],
        team_id: body['team_id']
      })
    })
  }

  render() {
    debugger;
    return(
      <div className="player_show_comments">
      <PlayerShow
        key={this.state.player.id}
        id={this.state.player.id}
        first_name={this.state.player.first_name}
        last_name={this.state.player.last_name}
        age={this.state.player.age}
        height={this.state.player.height}
        weight={this.state.player.weight}
        birth_city={this.state.player.birth_city}
        birth_country={this.state.player.birth_country}
        position={this.state.player.position}
        team_name={this.state.team_name}
        avatar_url={this.state.player.avatar_url}
        team_id={this.state.team_id}
      />
      <hr />
      <StatsTile
        id={this.state.stat.id}
        key={this.state.player.last_name+this.state.stat.ppg+this.state.stat.apg+this.state.stat.rpg}
        ppg={this.state.stat.ppg}
        apg={this.state.stat.apg}
        rpg={this.state.stat.rpg}
      />
      <hr />
        <CommentsContainer
          playerId={this.props.params.id}
        />
    </div>
    )
  }
}

export default PlayerShowContainer;
