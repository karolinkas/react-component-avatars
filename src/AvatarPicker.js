import React, { Component } from 'react';

import {Image} from "./Image.js"


export class AvatarPicker extends Component {
    constructor (props){
      super(props);
      this.state = {
        selected: 0
      };
      this.getCurrentImage = (image) => {
          this.setState({selected: image.id});
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
          return <li key={`column${item.props.image.label} + row${rowCount}`} className="gridElement" style={{display: 'inline-block'}}>{item}</li>
      }))
      grid.push(oneRow.map(item => {return <ul key={item.toString()}>{item}</ul>}))
      }
      return grid;
    }
  
  
    imageList (){
      return this.props.imageData.map((image, i) => {
        return (<Image image={image} imageToGrid={() => this.getCurrentImage(image)} selected={this.props.current === i ? true : false}/>
        );
      });
    }
    
    render (){
      return (
          <div onClick={() => this.props.pickerToApp(this.state.selected)} className="popover">
            <label>Choose your avatar</label>
            {this.grid()}
          </div>
      );
    }
}



