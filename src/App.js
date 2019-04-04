import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Button from './Button.js';
import ActualSearch from './Search.js';
import Firebase from'./firebase.js'

const apiUrl = `https://accesscontrolalloworiginall.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers/?key=2e6f996d79af39c55edc35ee6bf47d35`

class Search extends Component {

  getInfo = () => {
    axios.get(`${apiUrl}${this.state.query}`)
      .then(({ data }) => {
        this.setState({
          results: data.data
        })
      })
  }

    printBeer = (e) => {
      console.log(this.state.searchItem);
      e.preventDefault();
      fetch(`${apiUrl}&name=${this.state.searchItem}`)
        .then((data) => {
          return data.json();
        })
        .then((beers) => {
          console.log(beers)
            this.setState({
              beers:beers.data,
          })
        })
        .catch((err) => {
          console.log('Ya messed up')
        })
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    beerChange(a) {
      this.setState({
        [a.target.name]: a.target.value
      });
    }

    handleSubmit(e) {
      e.preventDefault();
      const itemsRef = Firebase.database().ref('items');
      const item = {
        title: this.state.customItem
      }
      itemsRef.push(item);
      this.setState({
        customItem: '',
      });
    }

    beerSubmit(a) {
      a.preventDefault();
      const itemsRef = Firebase.database().ref('items');
      const searchedBeerName = (this.state.beers[0].name)
      const item = {
        title: this.state.searchItem
      }
      itemsRef.push(item);
      this.setState({
        searchItem: searchedBeerName
      });
      console.log(this.state.beers[0].name)
    }

    removeItem(itemId) {
      const itemRef = Firebase.database().ref(`/items/${itemId}`);
      itemRef.remove();
    }

    constructor() {
      super();
      this.state = {
        customItem: '',
        items: [],
        results: [],
        beers: [],
        searchItem: '',
        name: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.beerSubmit = this.beerSubmit.bind(this);
    }

    componentDidMount() {
      const itemsRef = Firebase.database().ref('items');
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            title: items[item].title,
          });
        }
        this.setState({
          items: newState
        });
      });
    }

  render() {
    return (
      <div className="full-app">
        <div className="body-div">
        <section className="search">

            <ActualSearch/>

            <form onSubmit={this.printBeer}>
              <input
              type="text"
              name="searchItem"
              placeholder="Search for a beer"
              onChange={this.handleChange}
              value={this.searchedBeerName}>
              </input>
              <button>Search</button>
            </form>


            <form
            className="beer-waiting"
            onSubmit={this.beerSubmit}
            >
              <div className="beerDiv">
                <h3
                name="searchItem"
                onChange={this.beerChange}
                value="searchItem"
                className="stronger"
                >{JSON.stringify(this.state.beers.length>0 && this.state.beers[0].name)}</h3>
                <button
                className="button-push"
                >Add Searched Beer</button>
              </div>
            </form>


            <form onSubmit={this.handleSubmit}>
              <input
              name="customItem"
              onChange={this.handleChange}
              value={this.state.customItem}
              placeholder="Add a custom beer"
              >
              </input>
              <button>Add Custom Beer</button>
            </form>

              <ul>
                {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <button
                      onClick={() => this.removeItem(item.id)}
                      className="remove-btn"
                      >Remove</button>
                    </li>
                  )
                })}
              </ul>

          </section>
        </div>
      </div>
    )
  }
}

export default Search
