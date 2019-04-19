import React, { Component } from "react";
import "./App.css";
import "./util.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Gallery from "./components/Gallery.js";
import rrwebPlayer from "rrweb-player";
import { record } from "rrweb";


// We use a two-dimensional array to store multiple events array
const eventsMatrix = [[]];

record({
  emit(event, isCheckout) {
    // isCheckout is a flag to tell you the events has been checkout
    if (isCheckout) {
      eventsMatrix.push([]);
    }
    const lastEvents = eventsMatrix[eventsMatrix.length - 1];
    lastEvents.push(event);
  },
  checkoutEveryNms: 2 * 60 * 1000 // checkout every 2 minutes
});

const exportJSON = events => {
  const tempEl = document.createElement("a");
  tempEl.href = `data:application/json;charset=utf-8,${encodeURIComponent(
    events
  )}`;
  tempEl.target = "_blank";
  tempEl.download = `events-${Date.now()}.json`;
  tempEl.click();
};

const submitBug = events => {
  exportJSON(JSON.stringify(eventsMatrix[eventsMatrix.length - 1]));
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      publisher: "",
      items: []
    };
  }

  search() {
    const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
    fetch(
      `${API_URL}${this.state.title}${this.state.author}${this.state.publisher}`
    )
      .then(response => response.json())
      .then(json => {
        let { items } = json;
        this.setState({ items });
      }); // TODO: Add a catch method here in case the API call fails
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Book Finder</h1>
          <button className="button" onClick={submitBug}>Report Bug</button>
          <FormGroup className="App-search">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Title"
                onChange={event => this.setState({ title: event.target.value })}
                onKeyPress={event => {
                  if ("Enter" === event.key) {
                    this.search();
                  }
                }}
              />
              <FormControl
                type="text"
                placeholder="Author"
                onChange={event =>
                  this.setState({
                    author: "+inauthor:" + event.target.value
                  })
                }
                onKeyPress={event => {
                  if ("Enter" === event.key) {
                    this.search();
                  }
                }}
              />
              <FormControl
                type="text"
                placeholder="Publisher"
                onChange={event =>
                  this.setState({
                    author: "+inpublisher:" + event.target.value
                  })
                }
                onKeyPress={event => {
                  if ("Enter" === event.key) {
                    this.search();
                  }
                }}
              />
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </header>
        <div className="container main-content">
          <Gallery items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;
