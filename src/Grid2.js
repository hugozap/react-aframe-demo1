import React, { Component } from 'react';
import 'aframe';
import {Scene, Entity, Sky} from 'aframe-react'
import {Motion,spring} from 'react-motion';
import _ from 'lodash';

export default class Grid2 extends Component {

  static propTypes = {
    position: React.PropTypes.array.isRequired,
    rotation: React.PropTypes.string,
    size: React.PropTypes.number,
    primitive: React.PropTypes.string,
    rows: React.PropTypes.number.isRequired,
    spaceBetween: React.PropTypes.number,
    cols: React.PropTypes.number.isRequired,
    levels: React.PropTypes.number.isRequired,
    material: React.PropTypes.object,
    colors: React.PropTypes.array
  };


  constructor(props) {
    super(props);
  
    const size = props.size;
    const rows = _.range(props.rows);
    const cols = _.range(props.cols);
    const levels = _.range(props.levels);
    const points = [];
    const spaceBetween = props.spaceBetween || 0;
    const radius = props.size/2;
    const colors = props.colors || ['#000','#FC241B'];
    let colorIter = 0;
    rows.map((r)=>{
                cols.map((c)=> {
                  levels.map((l)=> {
                      const s = size;
                      const x = r * (s + spaceBetween);
                      const y = c * (s + spaceBetween);
                      const z = l * (s + spaceBetween);
                      const color = colors[(colorIter++) % colors.length];
                      points.push({x,y,z,color})
                  })
                })
              })

    this.state = { 
      points,
      radius,
    } 


  }

  componentDidMount() {
   
  }



  render() {

    const boxsize = this.state.size
    return (
        
          <Entity position={this.props.position} rotation={this.props.rotation || '0 0 0'}> 
            {this.state.points.map((p,ix) => {
            return (
              <Entity key={ix} geometry={{primitive: this.props.primitive, radius:this.props.size, width:this.props.size, height: this.props.size, depth: this.props.size}} material={{color: p.color}} position={[p.x, p.y, p.z]}/>
             )
            })}
          </Entity>
  
    );
  }
}

