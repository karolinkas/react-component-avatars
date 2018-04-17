import React, { Component } from 'react';
import './App.css';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

class App extends Component {
  
  grid () { 
    const grid = [];
    const gridElements = this.imageList();
    
    for (let i = 0; i < gridElements.length; i += 4) {
          const oneRow = [];
          oneRow.push(gridElements.slice(i, i + 4).map(item => {
        return <div className="gridElement" style={{display: 'inline-block'}}>{item}</div>
    }))
    grid.push(oneRow.map(itm => {return <div>{itm}</div>}))
    }
    return grid;
  }

  swapIcon (event){
    console.log(event);
  }

  imageList (){
    return images.map((image, i) => {
      return (
        <div key={i.toString()} onClick={this.swapIcon} className="imageWrapper">
          <img src={images[i]} alt="avatar"/>
        </div>
      );
    });
  }

  render() {

    return (
      <div> 
        <div><img alt="current" src={images[0]}/></div>
        <div className="popover">
          {this.grid()}
        </div>
      </div>
    );
  }
}

export default App;
