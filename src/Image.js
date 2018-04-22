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
        <div className={"overlay-background"}></div>
        <img title="Pick me!" onClick={this.setSelected} className={["avatar", "circle-border", (this.state.selected ? "spinner" : null), (this.props.selected ? "active" : null)].join(" ")} src={this.state.src} alt="avatar"/>
        <div className={this.state.selected ? "spinner" : null}></div>
      </div>);
    }
}
