import React from 'react';
import { Link } from 'react-router';
import VoteTile from './VoteTile'

const CommentTile = (props) => {
  let button = ""

  if (props.show) {
    button = <button type="button" className="delete-comment"  onClick = {props.handleDelete}>Delete Comment</button>
  }
  return(
    <div className="comment">
      <span className="username-comment">{props.username} writes:</span>
        <p>{props.body}</p>
        {button}
        <VoteTile
          onDownVote={props.handleDownVote}
          onUpVote={props.handleUpVote}
          voteCount={props.voteCount}
          commentId={props.commentId}
          userVote={props.userVote}
        />
        
    </div>
  )
}

export default CommentTile;
