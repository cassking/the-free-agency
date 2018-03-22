import React from 'react';
import { Link } from 'react-router';

const VoteTile = props => {
//if props.uservote, make classes regarding  displaying having upvoted or downvoted
  return(
    <div className="vote">
      <button className="vote"
        data-id={props.commentId}
        onClick={props.onUpVote.bind(this, props.commentId)}>&#8679;</button>
      <button className="vote"
        data-id={props.commentId}
        onClick={props.onDownVote.bind(this, props.commentId)}>&#8681;</button>
      <p>vote count: {props.voteCount}</p>
    </div>
  )
}

export default VoteTile;
