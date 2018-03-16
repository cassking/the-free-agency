import React from 'react';
import { Link } from 'react-router';

const CommentTile = props => {
  return(
    <div className="comment">
        <p>{props.body}</p>
    </div>
  )
}

export default CommentTile;
