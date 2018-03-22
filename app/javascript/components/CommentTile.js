import React from 'react';
import { Link } from 'react-router';
import VoteTile from './VoteTile'

const CommentTile = (props) => {
  let button = ""

  if (props.show) {
    button = <button type="button" className="button"  onClick = {props.handleDelete}>x</button>
  }
  return(
    <div className="comment">
      <span>{props.username} writes:</span>
        <p>{props.body}</p>
        {button}
        <VoteTile
          onDownVote={props.handleDownVote}
          onUpVote={props.handleUpVote}
          voteCount={props.voteCount}
          commentId={props.commentId}
        />
    </div>
  )
}

export default CommentTile;
