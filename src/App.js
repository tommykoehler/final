//move the API to a button or subpage. Do not run on App load

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { apiKey } from './constants';



class App extends Component {

  state = {

  }

  // sets "textUrl" as the string variable
  textUrl = 'https://accesscontrolalloworiginall.herokuapp.com/http://api.yelp.com/v3/businesses/search'

  // runs once app component is completly loaded
  componentDidMount() {
    console.log('component loaded');
    // console.log(apiKey);

    // this is the Heroku version and the second apiKey is the local apiKey
    console.log(process.env.apiKey || apiKey)
    this.getApi();
  }

  // do not use a ";" after fetch b/c it will close the fetch function
  getApi = () => {
      fetch(this.textUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        //setState is a default func that comes w/ every Component
        this.setState({
          apiResult: json.data,

        })
      });
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          { /* THIS IS A REACT COMMENT:
            takes the data from apiResult, turns it into a string, and prints it to the p tag*/}
          <p>{JSON.stringify(this.state.apiResult)}</p>
        </header>
      </div>
    );
  }
}

export default App;
