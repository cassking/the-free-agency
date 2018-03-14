import React from 'react';
import { browserHistory, Link } from 'react-router';

const PlayerShow = (props) => {
  return(
    <div className="player-show">
      <h2>{props.first_name}</h2>
    </div>
  )
}

export default PlayerShow;
