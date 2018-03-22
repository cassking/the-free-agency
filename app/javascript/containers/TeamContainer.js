import React, { Component } from 'react';
import TeamTile from '../components/TeamTile';


class TeamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      currentPage: 1,
      teamsPerPage: 4
    }
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { teams, currentPage, teamsPerPage } = this.state;

    // Logic for displaying players
    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const renderTeams = currentTeams.map((team, index) => {
      return(
        <TeamTile
          key={team.id}
          id={team.id}
          name={team.name}
          logo_url={team.logo_url}
        />
      )
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(teams.length / teamsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className="button"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return(
      <div>
        <ul>
          {renderTeams}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    )
  }
}

export default TeamContainer;
