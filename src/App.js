import React, { Component } from 'react';
import './App.css';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));


class Image extends Component {
  constructor (props){
    super(props);
    this.state = {...props.image};
    this.state.selected = false;
  }
  selectIcon (){
    this.setState({selected: true}); 
  }
  
  render (){
    return (<div key={this.state.src.toString()} onClick={() => this.selectIcon()} className="image-wrapper">
      <img className={["avatar", (this.state.selected ? "active" : null)].join(" ")} src={this.state.src} alt="avatar"/>
      <div className={"overlay-background"}></div>
    </div>);
  }
}

class AvatarPicker extends Component {
  constructor (props){
    super(props);
    this.state = {imageData: props.imageData};
  }

  grid () { 
    const grid = [];
    this.gridElements = this.imageList();
    
    for (let i = 0; i < this.gridElements.length; i += 4) {
          const oneRow = [];
          oneRow.push(this.gridElements.slice(i, i + 4).map(item => {
        return <div key={this.gridElements[i].key} className="gridElement" style={{display: 'inline-block'}}>{item}</div>
    }))
    grid.push(oneRow.map(item => {return <div key={item.toString()}>{item}</div>}))
    }
    return grid;
  }
  getCurrentImage (selectedImage, e){
    console.log("selectedImage");
    console.log(selectedImage);
    console.log(e);
  }

  imageList (){
    console.log(this);
    return this.state.imageData.map((image, i) => {
      return (<Image image={image} onClick={() => this.getCurrentImage(image)}/>
      );
    });
  }
  
  render (){
    return (
      <div className="popover">
      {this.grid()}
    </div>
    );
  }
}

class App extends Component {
  constructor (props){
    super(props);
    this.state = {imageData: images.map((image, i) => {
      return {"src" : image, "label": `Avatar ${i + 1}`, "id": i, "key": `key${i + 1}`};
    })};
  }

  render() {
    return (
      <div> 
        <div className="currentAvatar"><img alt="current" src={this.state.imageData[0].src}/></div>
        <AvatarPicker {...this.state}/>
      </div>
    );
  }
}

export default App;
