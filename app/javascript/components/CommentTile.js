import React from 'react';
import { Link } from 'react-router';
import VoteTile from './VoteTile'

const CommentTile = (props) => {
  return(
    <div className="comment">
      <span>{props.username} writes:</span>
        <p>{props.body}</p>
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
