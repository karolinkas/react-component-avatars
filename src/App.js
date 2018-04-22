import {AvatarPicker} from "./AvatarPicker.js"

import React, { Component} from 'react';
import './App.css';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

class App extends Component {
  constructor (props){
    super(props);

    this.imageData = images.map((image, i) => {
      return {"src" : image, "label": `Avatar ${i + 1}`, "id": i, "key": `key${i + 1}`};
    })

    this.state = {
      current: 0,
      open: false
    };

    this.setCurrentImage = (i) => {
      this.setState({current: i, open: false});

    };

    this.openPicker = () => {
      this.setState({open: !this.state.open});
    };
  }

  componentDidMount() {
    
    const wrapper = document.getElementsByClassName("wrapper")[0];
    const currentAvatar = document.getElementsByClassName("current-avatar")[0];
    
    // play the opening animation when avatar is clicked
    currentAvatar.addEventListener("click", (e) => {
      if (!this.state.open){
        // start opening on clicking current avatar
        wrapper.classList.add("opening");
        wrapper.classList.remove("closing");
        wrapper.classList.remove("closed");
      }
    });

    // close picker when selection has been made but only after spinner has shown and then keep closed
    wrapper.addEventListener("click", (e) => {
      if (this.state.open){
         setTimeout(function() { 
          wrapper.classList.add("closing");
          wrapper.classList.add("closed");
          wrapper.classList.remove("opening");
        }.bind(this), 1000);
      }
    });

    const content = document.getElementsByClassName("app-content")[0];

     // close picker when clicking outside of it
    content.addEventListener("click", (event) => {
      if (event.target.className === "app-content"){
        wrapper.classList.add("closing");
        wrapper.classList.add("closed");
        wrapper.classList.remove("opening");
      }
    });

  }

  render() {
    return (
      <div className="app-content"> 
        <div className="current-avatar circle-border">
          <img onClick={this.openPicker} alt="current" className="circle-border" src={this.imageData[this.state.current].src}/>
        </div>
        <div className={"wrapper closed"}>
          <AvatarPicker className={this.openPicker} pickerToApp={this.setCurrentImage} imageData={this.imageData}/>
        </div>
      </div>
    );
  }
}

export default App;
