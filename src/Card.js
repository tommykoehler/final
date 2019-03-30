// You need to call this for every page in order to import React
import React, { Component } from 'react';

import Button from './Button.js';

export default class Card extends React.Component {
  constructor (props) {
      super(props);
      this.items = [];
    }


    buttonClickRemove = () => {
      console.log('Remove button works');
    }


    render () {
      return (
        <div className="card">
          <p>Result</p><Button
            buttonText={'Remove'}
            clickHandler={this.buttonClickRemove}
          />
        </div>
      )
    }
}
