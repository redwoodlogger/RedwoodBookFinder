import React, { Component } from "react";
import "./App.css";
import "./util.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Gallery from "./components/Gallery.js";
import { record } from "rrweb";
import BugModal from "./BugModal";
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";

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
      // introjs states
      stepsEnabled: true,
      initialStep: 0,
      steps: [
        {
          element: ".body",
          intro: "This is a Book Finder app."
        },
        {
          element: ".App-search",
          intro: "Enter details here and press submit to conduct a search!"
        }
      ],
      hintsEnabled: true,
      hints: [
        {
          element: ".Search-title",
          hint: "Type title here.",
          hintPosition: "middle-middle"
        },
        {
          element: ".Search-author",
          hint: "Type author here.",
          hintPosition: "middle-middle"
        },
        {
          element: ".Search-publisher",
          hint: "Type publisher here.",
          hintPosition: "middle-middle"
        },
        {
          element: ".Search-submit",
          hint: "Click here or press 'Enter' to search!",
          hintPosition: "middle-middle"
        }
      ]
    };
  }

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
    const {
      stepsEnabled,
      steps,
      initialStep,
      hintsEnabled,
      hints
    } = this.state;

    return (
      <div className="App">
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={this.onExit}
        />
        <Hints enabled={hintsEnabled} hints={hints} />
        <header className="App-header">
          <h1 className="App-title">Book Finder</h1>
          <button className="button" onClick={this.submitBug}>
            Report Bug
          </button>

          <div className="controls">
            <div>
              <button className="btn tut-btn" onClick={this.toggleSteps}>
                Help plz
              </button>
            </div>
            <div>
              <button className="btn hint-btn" onClick={this.toggleHints}>
                Hints plz
              </button>
            </div>
          </div>

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
