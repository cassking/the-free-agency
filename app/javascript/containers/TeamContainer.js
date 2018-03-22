import React, { Component } from 'react';
import TeamTile from '../components/TeamTile';


class TeamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/teams')
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(teams => {
      this.setState({ teams: teams})
    })
  }

  render() {
    let teams = this.state.teams.map(team => {
      return(
        <div className="player-tile">
        <TeamTile
          key={team.id}
          id={team.id}
          name={team.name}
          logo_url={team.logo_url}
        />
      </div>
      )
    })
    return(
      <div>
        {teams}
      </div>
    )
  }
}

export default TeamContainer;
