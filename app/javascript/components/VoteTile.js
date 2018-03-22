import React from 'react';
import { Link } from 'react-router';

const VoteTile = props => {
  let upVoteClass = ""
  let downVoteClass = ""

  if (props.userVote > 0) {
     upVoteClass = upVoteClass + " upvoted"
    }
    else if (props.userVote < 0) {
      downVoteClass = downVoteClass + " downvoted"
    }
  return(
    <div className="vote">
      <button className={`vote ` + upVoteClass}
        data-id={props.commentId}
        onClick={props.onUpVote}>
      <span className={`vote ` + upVoteClass}>&#10506;</span>
      </button>
      <button className={`vote ` + downVoteClass}
        data-id={props.commentId}
        onClick={props.onDownVote}>
        <span className={`vote ` + downVoteClass}>&#10507;</span>

        </button>
      <p>vote count: {props.voteCount}</p>
    </div>
  )
}

export default VoteTile;
