import React, { Component } from 'react';
import PlayerShow from '../components/PlayerShow';
import CommentTile from '../components/CommentTile';
import StatsTile from '../components/StatsTile';
import CommentForm from '../components/CommentForm';

class PlayerShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      comments: [],
      comment: '',
      stat: {},
      errors: {},
      signed_in: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleFormSubmit(e) {
    e.preventDefault();
    if (
      this.validateSignedIn(this.state.signed_in) && this.validateBodyChange(this.state.comment)
    ) {
      let payload = {
        comment: {
          body: this.state.comment
        }
      }
      this.addNewComment(payload)
      this.setState({
        comment: ''
      })
    }
  }

  handleChange(e) {
    this.setState({ comment: e.target.value })
  }

  validateSignedIn(signed_in) {
    if (signed_in === false) {
      let newError = { SignIn: 'User must be signed in.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.SignIn
      this.setState({ errors: errorState })
      return true
    }
  }

  validateBodyChange(body) {
    if (body.trim() === '') {
      let newError = { Body: 'Body may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.Body
      this.setState({ errors: errorState })
      return true
    }
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
        signed_in: body['signed_in']
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
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    let commentForm;
    if (this.state.signed_in) {
      commentForm = <CommentForm             comment={this.state.comment}             handleFormSubmit={this.handleFormSubmit}              handleChange={this.handleChange} />
    }
    else {
      commentForm = <p>Sign in to comment</p>
    }
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
      {errorDiv}
      {commentForm}

      <div className='comments'>
        {comments}
      </div>
    </div>
    )
  }
}

export default PlayerShowContainer;
