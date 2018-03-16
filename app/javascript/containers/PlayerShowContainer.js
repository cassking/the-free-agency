import React, { Component } from 'react';
import PlayerShow from '../components/PlayerShow';
import CommentTile from '../components/CommentTile';
import StatsTile from '../components/StatsTile'

class PlayerShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      comments: [],
      stat: {}
    }
  }

  componentDidMount() {
    let playerId = this.props.params.id
    fetch(`/api/v1/players/${playerId}`)
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(body => {
      this.setState({
        player: body['player'],
        comments: body['comments'],
        stat: body['stat']
      })
    })
  }

  render() {
    let comments = this.state.comments.map( comment => {
      return (
        <CommentTile
          id={comment[0].id}
          key={comment[0].id}
          body={comment[0].body}
          username={comment[1]}
        />
      )
    })
    return(
      <div className="player_show_comments">
      <PlayerShow
        key={this.state.player.id}
        id={this.state.player.id}
        first_name={this.state.player.first_name}
        last_name={this.state.player.last_name}
        avatar_url={this.state.player.avatar_url}
      />
      <StatsTile
        id={this.state.stat.id}
        key={this.state.player.last_name+this.state.stat.ppg+this.state.stat.apg+this.state.stat.rpg}
        ppg={this.state.stat.ppg}
        apg={this.state.stat.apg}
        rpg={this.state.stat.rpg}
      />
      <div className='comments'>
        {comments}
      </div>
    </div>
    )
  }
}

export default PlayerShowContainer;
