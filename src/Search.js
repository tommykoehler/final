// You need to call this for every page in order to import React
import React, { Component } from 'react';

export default class Search extends Component {
  constructor (props) {
      super(props);
      this.items = [];
    }


    render () {
      return (
        <div>
          <input
            placeholder="Search"
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            type="text"
            id="search"
          />
          <h1>Test h1</h1>
        </div>
      )
    }
}
