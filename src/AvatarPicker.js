import React, { Component } from 'react';

import {Image} from "./Image.js"

export class AvatarPicker extends Component {
    constructor (props){
      super(props);
      this.state = {
        imageData: props.imageData,
        selected: 0
      };
      this.getCurrentImage = (i) => {
        if (this.state.imageData[i] && this.state.imageData[i].src){
          this.setState({selected: i + 1});
        }
      }
    }
  
    grid () { 
      const grid = [];
      this.gridElements = this.imageList();
      
      //this allows us to easily change the design by just changing the columnNumber
      const columnNum = 4;
      let rowCount = 0;
      for (let i = 0; i < this.gridElements.length; i += columnNum) {
            const oneRow = [];
            rowCount ++;
            oneRow.push(this.gridElements.slice(i, i + columnNum).map(item => {
          return <div key={`column${item.props.image.label} + row${rowCount}`} className="gridElement" style={{display: 'inline-block'}}>{item}</div>
      }))
      grid.push(oneRow.map(item => {return <div key={item.toString()}>{item}</div>}))
      }
      return grid;
    }
  
  
    imageList (){
      return this.state.imageData.map((image, i) => {
        return (<Image image={image} imageToGrid={() => this.getCurrentImage(i)}/>
        );
      });
    }
    
    render (){
        console.log(this);
        return (
            <div onClick={() => this.props.pickerToApp(this.state.selected)} className="popover">
                {this.grid()}
            </div>
      );
    }
}



