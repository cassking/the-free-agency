import React from 'react';
import { browserHistory, Link } from 'react-router';

const TeamShow = (props) => {
  return(
    <div className="team-show">
      <h2>{props.name}</h2>
    </div>
  )
}

export default TeamShow;
