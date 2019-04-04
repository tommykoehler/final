import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Button from './Button.js';
import ActualSearch from './Search.js';
import Firebase from'./firebase.js'
import beer from './beer.svg';

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

    handleSubmit(e) {
      e.preventDefault();
      const itemsRef = Firebase.database().ref('items');
      const item = {
        title: this.state.currentItem
      }
      itemsRef.push(item);
      this.setState({
        currentItem: '',
      });
    }

    removeItem(itemId) {
      const itemRef = Firebase.database().ref(`/items/${itemId}`);
      itemRef.remove();
    }

    constructor() {
      super();
      this.state = {
        currentItem: '',
        items: [],
        results: [],
        beers: [],
        searchItem: '',
        name: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

    addToList(a) {
      a.preventDefault();
      const searchBeer = document.getElementById('searchBeer');
      console.log(searchBeer);
      const addBox = document.getElementById("addBox").setAttribute("value", searchBeer);
      console.log(addBox);
    }

  render() {
    return (
      <div className="full-app">
        <div className="body-div">
        <section className="search">

          <img src={beer} className="App-logo" alt="logo" />

            <ActualSearch/>

            <form onSubmit={this.printBeer}>
              <input
              type="text"
              name="searchItem"
              placeholder="Search"
              onChange={this.handleChange}
              value={this.state.searchItem}>
              </input>
              <Button
              buttonText='Search Brews'
              />
            </form>

            <form>
              <div className='doc-results'>
                <ul className='action-results'>
                  <li>
                      <h3
                      name="currentItem"
                      value={this.state.currentItem}
                      id="searchBeer"
                      >
                      {JSON.stringify(this.state.beers.length>0 && this.state.beers[0].name)}
                      </h3>
                      <button
                      className="remove-btn"
                      onClick={this.addToList}
                      >Add</button>
                  </li>
                </ul>
              </div>
            </form>

            <form onSubmit={this.handleSubmit}>
              <input
              type="text"
              id = "addBox"
              name="currentItem"
              placeholder="Add a custom beer"
              onChange={this.handleChange}
              value={this.state.currentItem}>
              </input>
              <button>Add</button>
            </form>
          </section>


          <section>
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
