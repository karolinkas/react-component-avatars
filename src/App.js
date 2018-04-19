import {AvatarPicker} from "./AvatarPicker.js"

import React, { Component } from 'react';
import './App.css';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

class App extends Component {
  constructor (props){
    super(props);

    this.state = {
      current: 0,
      imageData: images.map((image, i) => {
        return {"src" : image, "label": `Avatar ${i + 1}`, "id": i, "key": `key${i + 1}`};
      }),
      open: false
    };

    this.setCurrentImage = (i) => {
      this.setState({current: i});
    }
    this.openPicker = () => {
      this.setState({open: !this.state.open});
      console.log(this.state.open);
    }
  }

  render() {
    return (
      <div> 
        <div className="current-avatar">
          <img onClick={this.openPicker} alt="current" src={this.state.imageData[this.state.current].src}/>
        </div>
          {this.state.open ? <AvatarPicker  pickerToApp={this.setCurrentImage} {...this.state}/> : null}
      </div>
    );
  }
}

export default App;
