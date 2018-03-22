import React, { Component } from 'react';
import CommentTile from '../components/CommentTile';
import CommentFormContainer from './CommentFormContainer';

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      signed_in: false,
      userVotes: [],
      if_admin: false
    }
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote= this.handleDownVote.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.getCommentsData = this.getCommentsData.bind(this);
    this.vote = this.vote.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  handleDeleteComment(comment_id) {
   console.log("pressed delete key");
   let playerId =this.state.player.id;
   console.log(`/api/v1/players/${playerId}/comments/${comment_id}`);
   }

  handleUpVote(commentId) {
    let newVote = {
      vote: {
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
    fetch(`/api/v1/players/${playerId}/comments/${newVote.vote.comment_id}/votes`, {
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
      this.setState({
        comments: body['comments'],
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
        console.log('body', body)
      this.setState({
        comments: body['comments'],
        signed_in: body['signed_in'],
        userVotes: body['userVotes']
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
      let updatedComments = this.state.comments;
      updatedComments.unshift(body['comment'])
      this.setState({
        comments: updatedComments
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let if_admin = this.state.if_admin
    let signed_in = this.state.signed_in
    let user_id = this.state.user_id
    let comments = this.state.comments.map( comment => {
     let votecount = 0;
     let userVote = 0;
     if (comment.votes){
       comment.votes.forEach( vote => {
          votecount += vote.up_or_down
       })
     }
  if(this.state.userVotes){
    this.state.userVotes.forEach( vote => {
       if(vote.comment_id === comment.comment.id){
         userVote = vote.up_or_down
       }
     })
  }

    let handleUpVote = () => { this.handleUpVote(comment.comment.id) }
    let handleDownVote = () => { this.handleDownVote(comment.comment.id) }
    let handleDelete =() =>{ this.handleDeleteComment(comment.comment.id) }
    let show = false

      return (
        <div className="comment-vote">
          <CommentTile
            id={comment.comment.id}
            key={comment.comment.id}
            body={comment.comment.body}
            username={comment.username}
            playerId={comment.comment.player_id}
            handleUpVote={handleUpVote}
            handleDownVote={handleDownVote}
            voteCount={votecount}
            userVote={userVote}
            commentId={comment.comment.id}
            handleDelete={handleDelete}
            show={show}
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
