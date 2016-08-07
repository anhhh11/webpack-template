import React from 'react'
import immutable from 'immutable'
import {Agent} from '../../libs/agent'
export default React.createClass({
  className: 'Home',
  getInitialState(){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  componentWillMount(){
    this.env = immutable.fromJS({
      maps: {
        "A": {"B": 0, "S": 0},
        "B": {},
        "S": {"C": 0},
        "C": {"D": 0, "F": 0, "E": 0},
        "G": {"F": 0},
        "D": {},
        "E": {"H": 0},
        "F": {},
        "H": {"G": 0}
      },
      destination: "G"
    });
    this.agent = new Agent(
      this.env,
      immutable.fromJS({
        startPosition: "A",
        path: []
      }));
  },
  componentDidMount(){
    // const {canvas} = this.refs,
    //   context = canvas.getContext('2d');
  },
  render(){
    const {width, height} = this.state;
    this.agent.live();
    {/*<canvas ref="canvas" id="canvas" width={width} height={height}></canvas>*/
    }
    return <div>
      hello world
    </div>
  }
});
