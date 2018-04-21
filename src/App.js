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
      this.setState({current: i});
    };

    this.openPicker = () => {
      this.setState({open: !this.state.open});
    };
  }

  componentDidMount() {
    
    const content = document.getElementsByClassName("app-content")[0];
    const wrapper = document.getElementsByClassName("wrapper")[0];
    const currentAvatar = document.getElementsByClassName("current-avatar")[0];
    
    // to stop and pause the opening animation add an addtional class
    // to play it and remove the same class when the animation is over
    currentAvatar.addEventListener("click", (e) => {
      if (!this.state.open){
        // start opening on clicking current avatar
        wrapper.classList.add("opening");
        wrapper.classList.remove("closing");
        wrapper.classList.remove("closed");
      }
    });

    wrapper.addEventListener("click", (e) => {
      if (this.state.open){
        // close only after spinner has shown
         setTimeout(function() { 
          wrapper.classList.add("closing");
          //wrapper.classList.add("closed");
          wrapper.classList.remove("opening");
          console.log(wrapper.classList);
        }.bind(this), 1000);
      }
    });
  }

  render() {
    return (
      <div className="app-content"> 
        <div className="current-avatar">
          <img onClick={this.openPicker} alt="current" src={this.imageData[this.state.current].src}/>
        </div>
        <div className={"wrapper closed"}>
          <AvatarPicker className={this.openPicker} pickerToApp={this.setCurrentImage} imageData={this.imageData}/>
        </div>
      </div>
    );
  }
}

export default App;
