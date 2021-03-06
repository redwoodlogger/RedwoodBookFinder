import React, { Component } from "react";
import "./App.css";
import "./util.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Gallery from "./components/Gallery.js";
import { record } from "rrweb";
import BugModal from "./BugModal";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";

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

const mockData = [
  {
    title: "Advanced Engineering Chemistry",
    imageLinks: { thumbnail: "1.jpg" },
    infoLink:
      "http://books.google.com.sg/books?id=Cx0QPbyFQ3MC&dq=redwood&hl=&source=gbs_api"
  },
  {
    title: "Pocket Flora of the Redwood Forest",
    imageLinks: { thumbnail: "2.jpg" },
    infoLink:
      "http://books.google.com.sg/books?id=E4_Qj-NK1fQC&dq=redwood&hl=&source=gbs_api"
  },
  {
    title: "Redwood Curtain",
    imageLinks: { thumbnail: "3.jpg" },
    infoLink:
      "http://books.google.com.sg/books?id=_yOWzQGziPIC&dq=redwood&hl=&source=gbs_api"
  },
  {
    title: "Redwood",
    imageLinks: { thumbnail: "4.jpg" },
    infoLink:
      "http://books.google.com.sg/books?id=kW-OhOw9ghUC&dq=redwood&hl=&source=gbs_api"
  },
  {
    title: "Redwood National Park (N.P.), General Management Plan (GMP)",
    imageLinks: { thumbnail: "5.jpg" },
    infoLink:
      "https://play.google.com/store/books/details?id=vi83AQAAMAAJ&source=gbs_api"
  },
  {
    title: "Redwood National and State Parks, General Management Plan",
    imageLinks: { thumbnail: "6.jpg" },
    infoLink:
      "https://play.google.com/store/books/details?id=5Ns3AQAAMAAJ&source=gbs_api"
  },
  {
    title: "Port of Redwood City Levee Project",
    imageLinks: { thumbnail: "7.jpg" },
    infoLink:
      "https://play.google.com/store/books/details?id=Qjk0AQAAMAAJ&source=gbs_api"
  },
  {
    title: "Redwood",
    imageLinks: { thumbnail: "8.jpg" },
    infoLink:
      "https://play.google.com/store/books/details?id=AfJE_SEiPLQC&source=gbs_api"
  },
  {
    title: "Foothill Blvd, Rogue River and Redwood Hwy, Josephine County",
    imageLinks: { thumbnail: "9.jpg" },
    infoLink:
      "https://play.google.com/store/books/details?id=yqw1AQAAMAAJ&source=gbs_api"
  },
  {
    title: "Redwood City",
    imageLinks: { thumbnail: "10.jpg" },
    infoLink:
      "http://books.google.com.sg/books?id=WlP8AFci2qwC&dq=redwood&hl=&source=gbs_api"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      publisher: "",
      items: [],
      openBugModal: false,
      driver: null
    };
  }

  // start of vanilla driver.js style code here
  componentDidMount() {
    const newDriver = new Driver();
    // Define the steps for introduction
    newDriver.defineSteps([
      {
        element: ".App-search",
        popover: {
          title: "Welcome to book finder!",
          description: "This is the search form.",
          position: "left"
        }
      },
      {
        element: ".Search-title",
        popover: {
          title: "Book Title",
          description: "Type in the title of the book you want to find here.",
          position: "left"
        }
      },
      {
        element: ".Search-author",
        popover: {
          title: "Book Author",
          description: "Type in the author of the book you want to find here.",
          position: "left"
        }
      },
      {
        element: ".Search-publisher",
        popover: {
          title: "Book Publisher",
          description:
            "Type in the publisher of the book you want to find here.",
          position: "left"
        }
      },
      {
        element: ".Search-submit",
        popover: {
          title: "Search",
          description: "Press enter or click here to conduct a search.",
          position: "right"
        }
      }
    ]);
    //Start the introduction
    newDriver.start();
  }
  // end of vanilla driver.js code

  exportJSON = events => {
    const tempEl = document.createElement("a");
    tempEl.href = `data:application/json;charset=utf-8,${encodeURIComponent(
      events
    )}`;
    tempEl.target = "_blank";
    tempEl.download = `events-${Date.now()}.json`;
    document.body.appendChild(tempEl);
    tempEl.click();
    document.body.removeChild(tempEl);
  };

  search() {
    let items = mockData;
    this.setState({ items });
  }

  submitBug = events => {
    // exportJSON(JSON.stringify(eventsMatrix[eventsMatrix.length - 1]));
    this.setState({ openBugModal: true });
  };

  handleClose = () => {
    this.setState({ openBugModal: false });
  };

  onExit = () => {
    this.setState(() => ({ stepsEnabled: false }));
  };

  toggleSteps = () => {
    this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
  };

  toggleHints = () => {
    this.setState(prevState => ({ hintsEnabled: !prevState.hintsEnabled }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Book Finder</h1>
          <button className="button" onClick={this.submitBug}>
            Report Bug
          </button>

          <FormGroup className="App-search">
            <InputGroup>
              <FormControl
                className="Search-title"
                type="text"
                placeholder="Title"
                onChange={event =>
                  this.setState({ title: "intitle:" + event.target.value })
                }
                onKeyPress={event => {
                  if ("Enter" === event.key) {
                    this.search();
                  }
                }}
              />
              <FormControl
                className="Search-author"
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
                className="Search-publisher"
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
              <InputGroup.Addon className="Search-submit" onClick="search">
                <Glyphicon glyph="search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </header>
        <div className="container main-content">
          <Gallery items={this.state.items} />
        </div>
        <BugModal
          open={this.state.openBugModal}
          exportJSON={this.exportJSON}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default App;
