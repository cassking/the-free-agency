import React, { Component } from 'react';
import TeamShow from '../components/TeamShow';
import PlayerTile from '../components/PlayerTile'

class TeamShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {},
      players: [],
      currentPage: 1,
      playersPerPage: 4
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    let teamId = this.props.params.id
    fetch(`/api/v1/teams/${teamId}`)
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(body => {
      this.setState({ team: body['team'], players: body['players'] })
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { players, currentPage, playersPerPage } = this.state;

    // Logic for displaying players
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

    const renderPlayers = currentPlayers.map((player, index) => {
      return(
        <PlayerTile
          key={player.id}
          id={player.id}
          first_name={player.first_name}
          last_name={player.last_name}
          avatar_url={player.avatar_url}
        />
      )
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(players.length / playersPerPage); i++) {
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
        <TeamShow
          key={this.state.team.id}
          id={this.state.team.id}
          name={this.state.team.name}
          logo_url={this.state.team.logo_url}
        />
        <ul>
          {renderPlayers}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    )
  }
}

export default TeamShowContainer;
