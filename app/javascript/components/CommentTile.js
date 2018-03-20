import React from 'react';
import { Link } from 'react-router';

const CommentTile = props => {
  return(
    <div className="comment">
      <span>{props.username} writes:</span>
        <p>{props.body}</p>
    </div>
  )
}

export default CommentTile;
