import React from 'react';
import { Link } from 'react-router';

const StatsTile = props => {
  return(
    <div className="stats">
      <p>
        PPG: {props.ppg}<br/>
        RPG: {props.rpg}<br/>
        APG: {props.apg}<br/>
      </p>
    </div>
  )
}

export default StatsTile;
