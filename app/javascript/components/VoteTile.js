import React from 'react';
import { Link } from 'react-router';

const VoteTile = props => {
  let upVoteClass = "fa fa-arrow-circle-o-up fa-2x voter"
  let downVoteClass = "fa fa-arrow-circle-o-down fa-2x voter"
  if (props.userVote > 0) {
    // let userVote = props.userVotes.filter(vote => {return vote.comment_id == props.id})[0]
    if (userVote.value == 1) {
      upVoteClass = upVoteClass + " upvoted"
    } else if (userVote.value == -1) {
      downVoteClass = downVoteClass + " downvoted"
    }
  }
//if props.uservote, make classes regarding  displaying having upvoted or downvoted
  return(
    <div className="vote">
      <button className={`vote ` + upVoteClass}
        data-id={props.commentId}
        onClick={props.onUpVote.bind(this, props.commentId)}>
        <i className={upVoteClass} aria-hidden="true"></i>
      </button>
      <button className={`vote ` + downVoteClass}
        data-id={props.commentId}
        onClick={props.onDownVote.bind(this, props.commentId)}>
        <i className={downVoteClass} aria-hidden="true"></i></button>
      <p>vote count: {props.voteCount}</p>
    </div>
  )
}

export default VoteTile;
