import React from 'react';
import { Link } from 'react-router';

const PlayerTile = props => {
  return(
    <div className="player">
      <Link to={`/players/${props.id}`}>
        <h4>{props.first_name} {props.last_name}</h4>
        <img src={props.avatar_url} />
      </Link>
    </div>
  )
}

export default PlayerTile;
