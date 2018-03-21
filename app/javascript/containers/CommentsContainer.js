import React, { Component } from 'react';
import CommentTile from '../components/CommentTile';
import CommentFormContainer from './CommentFormContainer';

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      userVotes:[],
      signed_in: false
    }
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote= this.handleDownVote.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.getCommentsData = this.getCommentsData.bind(this);
    this.vote = this.vote.bind(this);
  }
  handleUpVote(commentId) {
    let newVote = {
      value: 1,
      comment_id: commentId,
      player_id: this.props.playerId
    }
    this.vote(newVote)
  }
  handleDownVote(commentId) {
    let newVote = {
      value: -1,
      comment_id: commentId,
      player_id: this.props.playerId
    }
    this.vote(newVote)
  }
 vote(newVote){
let playerId =this.props.playerId;
fetch(`/api/v1/players/${playerId}/comments/${newVote.comment_id}/votes`, {
      credentials: 'same-origin',
      method: "POST",
      body: JSON.stringify(newVote),
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
      // debugger
      this.setState({
        userVotes: body['userVotes']
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
 }
 componentDidMount(){
   this.getCommentsData()
 }
  getCommentsData(){
    let playerId = this.props.playerId
    fetch(`/api/v1/players/${playerId}/comments`, {
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
        comments: body['comments'],
        signed_in: body['signed_in']
        // userVotes: body['userVotes']
      })
    })
  }

  addNewComment(formPayload) {
    let playerId = this.props.playerId
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
  render(){
    let comments = this.state.comments.map( comment => {
      let voteCount;
      console.log('vote in map', this.state.userVotes)
      this.state.userVotes.map( vote => {
        //return sum of all userVotes.up_or_down = voteCount
        voteCount = userVotes.push(vote)
        return(
          {voteCount}
        )
      })

      // determine if there's a vote in state which
      //matches local commnet.id as well as user
      //sned that vote down to comment tile
    let handleUpVote = () => { this.handleUpVote(comment[0].id) }
    let handleDownVote = () => { this.handleDownVote(comment[0].id) }
      return (
        <div className="comment-vote">
          <CommentTile
            id={comment[0].id}
            key={comment[0].id}
            body={comment[0].body}
            username={comment[1]}
            playerId={comment[0].player_id}
            handleUpVote={handleUpVote}
            handleDownVote={handleDownVote}
            voteCount={voteCount}
          />
        </div>
      )
    })

    return(
      <div className="comments-container">
      <CommentFormContainer
        addNewComment={this.addNewComment}
        signed_in={this.state.signed_in}
      />
      {comments}
    </div>
    )

  }


}

export default CommentsContainer;
