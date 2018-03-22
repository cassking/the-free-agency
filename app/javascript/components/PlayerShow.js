import React from 'react';
import { browserHistory, Link } from 'react-router';

const PlayerShow = (props) => {
  return(
    <div className="player-show">
      <div className="player-name">
        <h2>{props.first_name} {props.last_name}</h2>
          <img src={props.avatar_url}></img>
      </div>
      <div className = "player-info">
        <p>Age: {props.age}</p>
        <p>Height: {props.height}</p>
        <p>Weight: {props.weight}</p>
        <p>Birth City: {props.birth_city}</p>
        <p>Birth Country: {props.birth_country}</p>
        <p>Position: {props.position}</p>
        <Link to={`/teams/${props.team_id}`}>
          Team: {props.team_name}
        </Link>

      </div>
    </div>
  )
}

export default PlayerShow;
