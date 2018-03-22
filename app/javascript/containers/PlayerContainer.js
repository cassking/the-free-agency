import React, { Component } from 'react';
import PlayerTile from '../components/PlayerTile';
import Search from '../components/Search';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedPlayers: [],
      allPlayers: [],
      currentPage: 1,
      playersPerPage: 4
    }
    this.handleClick = this.handleClick.bind(this);
    this.searchPlayers = this.searchPlayers.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/players')
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(players => {
      this.setState({
        searchedPlayers: players,
        allPlayers: players
      })
    })
  }

  searchPlayers(query){
    if(query){
      let results = this.state.allPlayers.filter((player) => {
        return player.last_name.toLowerCase().includes(query) || player.first_name.toLowerCase().includes(query)
      });
      this.setState({ searchedPlayers: results })
    } else {
      this.setState({ searchedPlayers: this.state.allPlayers })
    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { searchedPlayers, currentPage, playersPerPage } = this.state;

    // Logic for displaying players
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = searchedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

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
    for (let i = 1; i <= Math.ceil(searchedPlayers.length / playersPerPage); i++) {
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
        <div className="search-container">
          <Search searchPlayers={this.searchPlayers}/>
        </div>
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

export default PlayerContainer;
