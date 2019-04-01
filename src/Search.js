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
          <h1><span>beer</span>list<span className="bolder">.</span></h1>
        </div>
      )
    }
}
