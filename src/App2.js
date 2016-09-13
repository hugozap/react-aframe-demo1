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
      this.setState({...this.state, delta: -45+Math.random()*90})
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
                  <Grid
                  position={[-100,-100,-1000]} 
                  primitive={'sphere'}
                  material={{color:'#001E50'}}
                  spaceBetween={200}
                  rows={2} cols={2} levels={5} size={val.delta}/>
                </Entity>

                
                
              ) 
            }}
         
          </Motion>
        
           <Grid
          position={[-350,-300,-500]} 
          primitive={'sphere'}
          material={{color:'#234883'}}
          spaceBetween={200}
          rows={4} cols={4} levels={2} size={5}/>

          <a-entity light="color: #AFA; intensity: 3" position="-1 1 0"></a-entity>

         <a-sky color="#F5DEE2"/>

       </Scene>
    );
  }
}

export default App;
