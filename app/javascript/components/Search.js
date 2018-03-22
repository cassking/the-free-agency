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
            <form className="form-inline">
            <label>Search</label>
            <input className="form-control mr-sm-2" id="search" ref="search" name="search" type="search" placeholder="Search" aria-label="Search" onKeyUp={this.handleSearch.bind(this)}/>
          </form>
          </div>
        </div>
      )
    }
 }

export default Search;
