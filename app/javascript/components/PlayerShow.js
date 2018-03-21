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
        <p>age: {props.age}</p>
        <p>height: {props.height}</p>
        <p>weight: {props.weight}</p>
        <p>birth_city: {props.birth_city}</p>
        <p>birth_country: {props.birth_country}</p>
        <p>position: {props.position}</p>
        <p>team: {props.team_name}</p>
      </div>
    </div>
  )
}

export default PlayerShow;
