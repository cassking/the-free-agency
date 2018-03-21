import React, { Component } from 'react';
import PlayerShow from '../components/PlayerShow';
import CommentTile from '../components/CommentTile';
import StatsTile from '../components/StatsTile';
import CommentFormContainer from './CommentFormContainer';

class PlayerShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      comments: [],
      stat: {},
      signed_in: false,
      team_name: ''
    }
    this.addNewComment = this.addNewComment.bind(this);
  }


  addNewComment(formPayload) {
    let playerId = this.props.params.id
    fetch(`/api/v1/players/${playerId}/comments`, {
      method: 'POST',
      body: JSON.stringify(formPayload),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({comments: body.comments})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    let playerId = this.props.params.id
    fetch(`/api/v1/players/${playerId}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(body => {
      this.setState({
        player: body['player'],
        comments: body['comments'],
        stat: body['stat'],
        signed_in: body['signed_in'],
        team_name: body['team_name']
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
        age={this.state.player.age}
        height={this.state.player.height}
        weight={this.state.player.weight}
        birth_city={this.state.player.birth_city}
        birth_country={this.state.player.birth_country}
        position={this.state.player.position}
        team_name={this.state.team_name}
        avatar_url={this.state.player.avatar_url}
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
      <CommentFormContainer
        addNewComment={this.addNewComment}
        signed_in={this.state.signed_in}
      />
      <hr />
      <div className='comments'>
        {comments}
      </div>
    </div>
    )
  }
}

export default PlayerShowContainer;
