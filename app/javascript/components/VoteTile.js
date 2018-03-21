import React from 'react';
import { Link } from 'react-router';

const VoteTile = props => {
//if props.uservote, make classes regarding  displaying having upvoted or downvoted
  return(
    <div className="vote">
      <button className="vote" onClick={props.onUpVote}>&#8679;</button>
      <button className="vote" onClick={props.onDownVote}>&#8681;</button>
      <p>vote count: {props.voteCount}</p>
    </div>
  )
}

export default VoteTile;
