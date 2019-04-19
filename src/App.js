import React, { Component } from "react";
import "./App.css";
import "./util.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Gallery from "./components/Gallery.js";

const mockData = [{"title":"Advanced Engineering Chemistry","imageLinks":{"thumbnail":"1.jpg"},"infoLink":"http://books.google.com.sg/books?id=Cx0QPbyFQ3MC&dq=redwood&hl=&source=gbs_api"},
{"title":"Pocket Flora of the Redwood Forest","imageLinks":{"thumbnail":"2.jpg"},"infoLink":"http://books.google.com.sg/books?id=E4_Qj-NK1fQC&dq=redwood&hl=&source=gbs_api"},
{"title":"Redwood Curtain","imageLinks":{"thumbnail":"3.jpg"},"infoLink":"http://books.google.com.sg/books?id=_yOWzQGziPIC&dq=redwood&hl=&source=gbs_api"},
{"title":"Redwood","imageLinks":{"thumbnail":"4.jpg"},"infoLink":"http://books.google.com.sg/books?id=kW-OhOw9ghUC&dq=redwood&hl=&source=gbs_api"},
{"title":"Redwood National Park (N.P.), General Management Plan (GMP)","imageLinks":{"thumbnail":"5.jpg"},"infoLink":"https://play.google.com/store/books/details?id=vi83AQAAMAAJ&source=gbs_api"},
{"title":"Redwood National and State Parks, General Management Plan","imageLinks":{"thumbnail":"6.jpg"},"infoLink":"https://play.google.com/store/books/details?id=5Ns3AQAAMAAJ&source=gbs_api"},
{"title":"Port of Redwood City Levee Project","imageLinks":{"thumbnail":"7.jpg"},"infoLink":"https://play.google.com/store/books/details?id=Qjk0AQAAMAAJ&source=gbs_api"},
{"title":"Redwood","imageLinks":{"thumbnail":"8.jpg"},"infoLink":"https://play.google.com/store/books/details?id=AfJE_SEiPLQC&source=gbs_api"},
{"title":"Foothill Blvd, Rogue River and Redwood Hwy, Josephine County","imageLinks":{"thumbnail":"9.jpg"},"infoLink":"https://play.google.com/store/books/details?id=yqw1AQAAMAAJ&source=gbs_api"},
{"title":"Redwood City","imageLinks":{"thumbnail":"10.jpg"},"infoLink":"http://books.google.com.sg/books?id=WlP8AFci2qwC&dq=redwood&hl=&source=gbs_api"}]

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
    let items = mockData;
    this.setState({ items });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Book Finder</h1>
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
              <InputGroup.Addon onClick="search">
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
