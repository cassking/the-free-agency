import React, { Component } from 'react';
import CommentTile from '../components/CommentTile';
import CommentFormContainer from './CommentFormContainer';

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      votes:[],
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
      vote:{
      up_or_down: 1,
      comment_id: commentId
    }
  }
    this.vote(newVote)
  }
  handleDownVote(commentId) {
    let newVote = {
      vote: {
      up_or_down: -1,
      comment_id: commentId
    }
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
       console.log('body from json', body)
      this.setState({
        comments: body['comments']
        // votecount: body['votecount'],
        // votes: body['votes']
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
        votes: body['votes'],
        signed_in: body['signed_in']
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
     let votecount = 0;
     if (comment[2]){
       comment[2].forEach( vote => {
           votecount += vote.up_or_down
       })
     }
    console.log('votecount', votecount)
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
            voteCount={votecount}
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
