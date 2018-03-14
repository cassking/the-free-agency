import React from 'react';
import { Link } from 'react-router';

const PlayerTile = props => {
  return(
    <div className="player">
      <Link to={`/players/${props.id}`}><h1>{props.last_name}</h1></Link>
    </div>
  )
}

export default PlayerTile;
