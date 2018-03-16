import React, { Component } from 'react';
import PlayerShow from '../components/PlayerShow';
import CommentTile from '../components/CommentTile';


class PlayerShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      comments:[]
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
        comments: body['comments']
      })
    })
  }

  render() {
    let comments = this.state.comments.map( comment => {
      return (
        <CommentTile
          id={comment.id}
          key={comment.player_id}
          body={comment.body}
          user_id={comment.user_id}
          player_id={comment.player_id}
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
      {comments}
    </div>
    )
  }
}

export default PlayerShowContainer;
