import React, { Component } from "react";
import "./App.css";
import "./util.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Gallery from "./components/Gallery.js";

const mockData = [{"title":"Advanced Engineering Chemistry","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=Cx0QPbyFQ3MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"http://books.google.com.sg/books?id=Cx0QPbyFQ3MC&dq=redwood&hl=&source=gbs_api"},
{"title":"Pocket Flora of the Redwood Forest","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=E4_Qj-NK1fQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"http://books.google.com.sg/books?id=E4_Qj-NK1fQC&dq=redwood&hl=&source=gbs_api"},
{"title":"Redwood Curtain","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=_yOWzQGziPIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"http://books.google.com.sg/books?id=_yOWzQGziPIC&dq=redwood&hl=&source=gbs_api"},
{"title":"Redwood","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=kW-OhOw9ghUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"http://books.google.com.sg/books?id=kW-OhOw9ghUC&dq=redwood&hl=&source=gbs_api"},
{"title":"Redwood National Park (N.P.), General Management Plan (GMP)","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=vi83AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"https://play.google.com/store/books/details?id=vi83AQAAMAAJ&source=gbs_api"},
{"title":"Redwood National and State Parks, General Management Plan","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=5Ns3AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"https://play.google.com/store/books/details?id=5Ns3AQAAMAAJ&source=gbs_api"},
{"title":"Port of Redwood City Levee Project","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=Qjk0AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"https://play.google.com/store/books/details?id=Qjk0AQAAMAAJ&source=gbs_api"},
{"title":"Redwood","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=AfJE_SEiPLQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"https://play.google.com/store/books/details?id=AfJE_SEiPLQC&source=gbs_api"},
{"title":"Foothill Blvd, Rogue River and Redwood Hwy, Josephine County","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=yqw1AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"https://play.google.com/store/books/details?id=yqw1AQAAMAAJ&source=gbs_api"},
{"title":"Redwood City","imageLinks":{"thumbnail":"http://books.google.com/books/content?id=WlP8AFci2qwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},"infoLink":"http://books.google.com.sg/books?id=WlP8AFci2qwC&dq=redwood&hl=&source=gbs_api"}]

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
