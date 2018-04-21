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
      console.log(i);
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
    
    // to stop and pause the animation add an addtional class
    // to play it and remove the same class when the animation is over
    content.addEventListener("click", (e) => {
      if (!this.state.open){
        wrapper.classList.add("opening");
        wrapper.classList.remove("closing");
      } else {
        wrapper.classList.add("closing");
        wrapper.classList.remove("opening");
      }

    });
  }

  render() {
    return (
      <div className="app-content"> 
        <div className="current-avatar">
          <img onClick={this.openPicker} alt="current" src={this.imageData[this.state.current].src}/>
        </div>
        <div className={"wrapper"}>
          <AvatarPicker pickerToApp={this.setCurrentImage} imageData={this.imageData}/>
        </div>
      </div>
    );
  }
}

export default App;
