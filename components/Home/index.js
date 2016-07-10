import React from 'react'
export default React.createClass({
  className: 'Home',
  getInitialState(){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  componentDidMount(){
    const {canvas} = this.refs,
      context = canvas.getContext('2d');
    const image = new Image();
    image.src = 'assets/images/'
  },
  render(){
    const {width, height} = this.state;
    return <canvas ref="canvas" id="canvas" width={width} height={height}></canvas>
  }
});
