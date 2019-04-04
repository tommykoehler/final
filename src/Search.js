// You need to call this for every page in order to import React
import React, { Component } from 'react';
import beer from './beer.svg';

export default class Search extends Component {
  constructor (props) {
      super(props);
      this.items = [];
    }


    render () {
      return (
        <div>
          <img src={beer} className="App-logo" alt="logo" />
          <h1><span>beer</span>list<span className="bolder">.</span></h1>
        </div>
      )
    }
}
