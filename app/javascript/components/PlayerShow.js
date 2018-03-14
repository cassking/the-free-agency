import React from 'react';
import { browserHistory, Link } from 'react-router';

const PlayerShow = (props) => {
  return(
    <div className="player-show">
      <h2>{props.first_name} {props.last_name}</h2>
        <img src={props.avatar_url}></img>
    </div>
  )
}

export default PlayerShow;
