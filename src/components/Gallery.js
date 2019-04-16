import React, { Component } from "react";
import book from "../images/book.svg";
import "./Gallery.css";

// TODO: Can this component be functional instead?
class Gallery extends Component {
  render() {
    return (
      <div>
        {this.props.items !== undefined &&
          this.props.items.map((item, index) => {
            let { title, imageLinks, infoLink } = item.volumeInfo;
            return (
              <div className="book">
                <img
                  src={
                    undefined !== imageLinks ? imageLinks.thumbnail : { book }
                  }
                  alt={`Pictured: The cover for the book ${title}.`}
                  className="bookCover"
                />
                <a key={index} href={infoLink} target="_blank" rel="noopener">
                  {title}
                </a>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Gallery;
