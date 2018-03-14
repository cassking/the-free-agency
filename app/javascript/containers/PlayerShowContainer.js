import React, { Component } from 'react';
import PlayerShow from '../components/PlayerShow';


class PlayerShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {}
    }
  }

  componentDidMount() {
    console.log('hi')
    let playerId = this.props.params.id
    fetch(`/api/v1/players/${playerId}`)
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(body => {
      this.setState({ player: body })
    })
  }

  render() {
    return(
      <PlayerShow
        key={this.state.player.id}
        id={this.state.player.id}
        first_name={this.state.player.first_name}
      />
    )
  }
}

export default PlayerShowContainer;
