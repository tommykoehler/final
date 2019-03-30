import React, { Component } from 'react'
//import axios from 'axios'

//const { API_KEY } = '2e6f996d79af39c55edc35ee6bf47d35'
const API_URL = 'https://accesscontrolalloworiginall.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers/?key=2e6f996d79af39c55edc35ee6bf47d35'

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  runApi = () => {
    console.log(API_URL);
  }

  // getInfo = () => {
  //   axios.get(`${API_URL}${this.state.query}`)
  //     .then(({ data }) => {
  //       this.setState({
  //         results: data.data // MusicGraph returns an object named data,
  //                            // as does axios. So... data.data
  //       })
  //     })
  // }

  findApi = () => {
        // fetch(API_URL)
        // .then(function(response) {
        //   return response.json();
        // })
        // .then(function(myJson) {
        //   console.log(JSON.stringify(myJson));
        // });
        console.log('hi')
  }

  // handleInputChange = () => {
  //   this.setState({
  //     query: this.search.value
  //   }, () => {
  //     if (this.state.query && this.state.query.length > 1) {
  //       if (this.state.query.length % 2 === 0) {
  //         this.getInfo()
  //         console.log('Type works');
  //       }
  //     }
  //   })
  // }

// findApi()

  render() {
    return (
      <form>
        <input
          placeholder="Search"
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>

    )
  }
}

export default Search
