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
        return <div style={{display: 'inline-block'}}>{item}</div>
    }))
    grid.push(oneRow.map(itm => {return <div>{itm}</div>}))
    }
    return grid;
   }

  imageList (){
    return images.map((image, i) => {
      return (
        <div key={i} className="grid">
          <div className="col"><img src={images[i]} alt="avatar"/></div>
        </div>
      );
    });
  }

  render() {

    return (
      <div> 
        <div><img src={images[0]}/></div>
        <div className="popover">
          {this.grid()}
        </div>
    </div>
    );
  }
}

export default App;
