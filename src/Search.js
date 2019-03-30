// You need to call this for every page in order to import React
import React, { Component } from 'react';

export default class Search extends React.Component {
  constructor (props) {
      super(props);
      this.items = [];
    }


    render () {
      return (
        <div>
          <input onChange={this.onTextChange} type="text" id="search"/>
        </div>
      )
    }
}
