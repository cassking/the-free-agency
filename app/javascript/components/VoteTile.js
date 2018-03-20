import React from 'react';
import { Link } from 'react-router';

const VoteTile = props => {

  return(
    <div className="vote">
      <button className="vote" onClick={props.onUpVote}>&#8679;</button>
      <button className="vote" onClick={props.onDownVote}>&#8681;</button>
      <span className="votecount">total no. upvotes: </span>
    </div>
  )
}

export default VoteTile;
