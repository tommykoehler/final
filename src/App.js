import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Button from './Button.js';
import ActualSearch from './Search.js';
import './App.css'
import Firebase from'./firebase.js'

const apiUrl = `https://accesscontrolalloworiginall.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers/?key=2e6f996d79af39c55edc35ee6bf47d35`

class Search extends Component {
  state = {
    // query: '',
    results: []
  }



  getInfo = () => {
    axios.get(`${apiUrl}${this.state.query}`)
      .then(({ data }) => {
        this.setState({
          results: data.data
        })
      })
  }

    printBeer = () => {
      fetch(apiUrl)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data)
            this.setState({
              data: data.name,
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
        items: []
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
            user: items[item].user
          });
        }
        this.setState({
          items: newState
        });
      });
    }

    // <ul>{this.state.results.map((data) => {
    //     return (
    //       <li>{data.name}</li>
    //     )
    //   })}
    // </ul>
  render() {
    return (
      <div className="full-app">
        <div className="body-div">
        <section className="search">
            <Button
            clickHandler={this.printBeer}
            buttonText='get brews'
            />
            <ActualSearch/>
            <form onSubmit={this.handleSubmit}>
              <input
              type="text"
              name="currentItem"
              placeholder="What are you bringing?"
              onChange={this.handleChange}
              value={this.state.currentItem}>
              </input>
              <button>Add Beer</button>
            </form>
          </section>
          <section className="lister">
            <div className="wrapper">
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
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Search
