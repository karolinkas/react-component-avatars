import React, { Component } from 'react';

export class Image extends Component {
    constructor (props){
      super(props);
      this.state = {...props.image};
      this.state.selected = false;

      this.setSelected = () => {
        this.setState({selected: !this.state.selected});
      };
    }
  
    render (){
      return (<div key={this.state.src.toString()} onClick={this.props.imageToGrid} className="image-wrapper">
        <img onClick={this.setSelected} className={["avatar", "circle-border", (this.state.selected ? "spinner" : null)].join(" ")} src={this.state.src} alt="avatar"/>
        <div className={"overlay-background"}></div>
        <div className={[(this.state.selected ? "spinner" : null)].join(" ")}></div>
      </div>);
    }
}
