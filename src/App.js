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

    
    this.openPicker = () => {
      this.setState({open: !this.state.open});
    };

    this.setCurrentImage = (i) => {
        this.setState({current: i, open: false});
    };
  }
  
  makeFakeRequest(){

    return new Promise((resolve, reject) => {

      setTimeout(() => { 
        resolve("Request returned");
      }, 1000);
    });

  }

  componentDidMount() {
    
    const wrapper = document.getElementsByClassName("wrapper")[0];
    const currentAvatar = document.getElementsByClassName("current-avatar")[0];
    
    // play the opening animation when avatar is clicked
    currentAvatar.addEventListener("click", (event) => {
      if (!this.state.open){
        // start opening on clicking current avatar
        wrapper.classList.add("opening");
        wrapper.classList.remove("closing");
        wrapper.classList.remove("closed");
      }
    });

    // close picker when selection has been made but only after spinner has shown and then keep closed
    wrapper.addEventListener("click", (event) => {
      if (this.state.open){

        this.makeFakeRequest().then(() => {

          //change current image only once request is done
          this.setCurrentImage(event.target.id)

          wrapper.classList.add("closing");
          wrapper.classList.add("closed");
          wrapper.classList.remove("opening");
        }); 

      }
    });

    const content = document.getElementsByClassName("app-content")[0];

     // close picker when clicking outside of it
    content.addEventListener("click", (event) => {
      if (event.target.className === "app-content"){
        wrapper.classList.add("closing");
        wrapper.classList.add("closed");
        wrapper.classList.remove("opening");
        this.setState({open: false});    
      }
    });

  }

  render() {
    return (
      <div className="app-content"> 
        <div className="current-avatar circle-border">
          <img onClick={this.openPicker} alt="current" className={["circle-border", (this.state.open ? "active": null)].join(" ")} src={this.imageData[this.state.current].src}/>
        </div>
        <div className={"wrapper closed"}>
          <AvatarPicker className={this.openPicker} pickerToApp={this.setCurrentImage} imageData={this.imageData} {...this.state}/>
        </div>
      </div>
    );
  }
}

export default App;
