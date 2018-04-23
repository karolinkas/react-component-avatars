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

    
    this.togglePicker = () => {
      this.setState({open: !this.state.open});
    };

    this.setCurrentImage = (i) => {
        //if same avatar is chosen again, there doesn't have to be a state change
        if (i && i !== this.state.current){
          this.setState({current: i, open: false});
        }
    };

    //close avatar picker on pressing pressing ESC key
    this.onKeyPressed = (event) => {
      
      console.log(event.key);
      const wrapper = document.getElementsByClassName("wrapper")[0];

      if (event.key === "Escape"){

        wrapper.classList.add("closing");
        wrapper.classList.add("closed");
        wrapper.classList.remove("opening");
        this.togglePicker();

      } else if (event.key === "ArrowRight"){

        let current = this.state.current;
        if (this.imageData[current + 1]){
          this.setCurrentImage(current + 1);  
        }

      } else if (event.key === "ArrowLeft"){

        let current = this.state.current;
        if (this.imageData[current - 1]){
          this.setCurrentImage(current - 1);  
        }

      } else if (event.key === "Enter"){
        wrapper.classList.add("closing");
        wrapper.classList.add("closed");
        wrapper.classList.remove("opening");
        this.togglePicker();
      }
    }

  }
  

  //do some imaginary request to another server
  makeFakeRequest(){

    return new Promise((resolve, reject) => {
      setTimeout(() => { 
        resolve("Request returned");
      }, 1000);
    });

  }

  // play the opening animation when avatar is clicked
  listenForOpen (wrapper, current){
  
    current.addEventListener("click", (event) => {
      if (!this.state.open){
        wrapper.classList.add("opening");
        wrapper.classList.remove("closing");
        wrapper.classList.remove("closed");
      }
    });
  }

  // close picker when selection has been made but only after spinner has shown and then keep closed
  listenForSelection (wrapper){

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

  }

  listenForClickOutside (content, wrapper){

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


  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed);
}

  componentDidMount() {
    
    const wrapper = document.getElementsByClassName("wrapper")[0];
    const currentAvatar = document.getElementsByClassName("current-avatar")[0];
    const content = document.getElementsByClassName("app-content")[0];

    this.listenForOpen(wrapper, currentAvatar);
  
    this.listenForSelection(wrapper);

    this.listenForClickOutside(content, wrapper);
  
  }

  render() {
    return (
      <div className="app-content"> 
        <div className="current-avatar circle-border">
          <img onClick={this.togglePicker} alt="current" className={["circle-border", (this.state.open ? "active": null)].join(" ")} src={this.imageData[this.state.current].src}/>
        </div>
        <div className={"wrapper closed"}>
          <AvatarPicker pickerToApp={this.setCurrentImage} imageData={this.imageData} {...this.state}/>
        </div>
        <div onKeyDown={this.onKeyPressed} tabIndex="0"></div>
      </div>
    );
  }
}

export default App;
