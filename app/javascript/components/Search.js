import React, { Component } from 'react';
import { Link } from 'react-router';

class Search extends Component {
  handleSearch(event) {
      this.props.searchPlayers(event.target.value)
    }
    render() {
      return (
        <div className="row">
          <div className="input-field">
            <label>Search</label>
            <input type="text" onKeyUp={this.handleSearch.bind(this)}/>
          </div>
        </div>
      )
    }
 }

export default Search;