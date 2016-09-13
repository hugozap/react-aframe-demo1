import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'aframe';
import {Scene, Entity, Sky} from 'aframe-react'
import {Motion,spring} from 'react-motion';
import Grid from './Grid2.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      delta:1
    }

  }

  componentDidMount() {
    setInterval(()=>{
      const currentDelta = this.state.delta;
      this.setState({...this.state, delta: -45+Math.random()*40})
    },1000)
  }

  render() {
    var state = this.state;


    return (
        <Scene keyboard-shortcuts="enterVR: true"> 
          <Motion defaultStyle={{delta:0}} style={{delta:spring(this.state.delta, {precision:0.000001})}}>
            {(val)=>{
              const rotateX = val.delta/8
              const rotateY = val.delta
              const rotateZ = val.delta/10
              return (

                <Entity camera="userHeight: 1.8" look-controls wasd-controls   rotation={`${rotateX} ${rotateY} ${rotateZ}`}  position={[0,0,0]}>
                </Entity> 
                
              ) 
            }}
         
          </Motion>
        
           <Grid
          position={[-350,-300,-3000]} 
          primitive={'sphere'}
          spaceBetween={800}
          colors={['#72a553','#a265c2', '#c57c3d' ,'#6097ce', '#ca5572']}
          rows={4} cols={4} levels={4} size={100}/>

          <a-entity light="color: #AFA; intensity: 3" position="-1 1 0"></a-entity>

         <a-sky color="#6097ce"/>

       </Scene>
    );
  }
}

export default App;
