import React from 'react';
import { Link } from 'react-router';

const TeamTile = props => {
  return(
    <div className="team">
      <Link to={`/teams/${props.id}`}>
        <h4>{props.name}</h4>
        <img src={props.logo_url} />
      </Link>
    </div>
  )
}

export default TeamTile;
