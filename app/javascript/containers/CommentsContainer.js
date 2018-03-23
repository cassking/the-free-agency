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
      currentPage: 1,
      commentsPerPage: 4,
      if_admin: false,
      user_id: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote= this.handleDownVote.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.getCommentsData = this.getCommentsData.bind(this);
    this.vote = this.vote.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  handleDeleteComment(comment_id) {
   let playerId =this.props.playerId;
   fetch(`/api/v1/players/${playerId}/comments/${comment_id}`, {
     method: 'DELETE',
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
     this.setState({
       comments: body['comment']['comments'],
       userVotes: body['comment']['userVotes']
     })
   })
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

      this.setState({
        comments: body['comments'],
        signed_in: body['signed_in'],
        userVotes: body['userVotes'],
        if_admin: body['if_admin'],
        user_id: body['user_id']
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
        comments: updatedComments,
        signed_in: body['signed_in']
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render(){
    const { comments, currentPage, commentsPerPage } = this.state;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    let if_admin = this.state.if_admin
    let signed_in = this.state.signed_in
    let user_id = this.state.user_id
    const renderComments = currentComments.map((comment, index) => {

      let votecount = 0;
      let userVote = 0;
      let handleDelete =() =>{ this.handleDeleteComment(comment.comment.id) }
      let show = false
      if (if_admin) {
        show = true
      } else if (user_id == comment.comment.user_id) {
        show = true
      } else {}
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
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className="button"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return(
      <div className="comments-container">
        <CommentFormContainer
          addNewComment={this.addNewComment}
          signed_in={this.state.signed_in}
        />
        <ul>
          {renderComments}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    )
  }
}

export default CommentsContainer;
