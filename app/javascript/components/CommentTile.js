import React, { Component } from 'react';
import { Link } from 'react-router';
import VoteTile from './VoteTile'


class CommentTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote:0,
      votes: []
    }
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote= this.handleDownVote.bind(this);
  }

  componentDidMount(){
    let commentId = this.props.id
    let playerId = this.props.playerId
    fetch(`/api/v1/players/${playerId}/comments/${commentId}/votes`)
     .then(response => {

     if (response.ok) {
         return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    }).then( data => {
      console.log('data', data)
      this.setState({ votes: data['votes'] })
    })

  }

  handleUpVote(event) {
    this.setState({
      vote: 1
    });

  }
  handleDownVote(event) {
    this.setState({
      vote: -1
    });
  }

render() {
  let voteCount;
  console.log('vote in map', this.state.votes)
  Object.keys(this.state.votes).map( vote => {
    //return sum of all votes.up_or_down = voteCount
    voteCount = votes.push(vote)
    return(
      {voteCount}
    )
  })
  return(
    <div className="comment">
      <span>{this.props.username} writes:</span>
        <p>{this.props.body}</p>
        <VoteTile
          id={this.id}
          key={this.id}
          onDownVote={this.handleDownVote}
          onUpVote={this.handleUpVote}
          voteCount={voteCount}
        />
    </div>
  )
}

}

export default CommentTile;
