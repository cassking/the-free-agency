import React from 'react';
import { Link } from 'react-router';

const CommentTile = props => {
  let button = ""

  if (props.show) {
    button = <button type="button" className="button"  onClick = {props.handleDelete}>x</button>
  }

  return(
    <div className="comment">
      <span>{props.username} writes:</span>
        <p>{props.body}</p>
        {button}
    </div>
  )
}

export default CommentTile;
