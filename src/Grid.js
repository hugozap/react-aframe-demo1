import React, { Component } from 'react';
import 'aframe';
import {Scene, Entity, Sky} from 'aframe-react'
import {Motion,spring} from 'react-motion';
import _ from 'lodash';

export default class Grid extends Component {

  static propTypes = {
    size: React.PropTypes.number,
    primitive: React.PropTypes.string,
    rows: React.PropTypes.number.isRequired,
    spaceBetween: React.PropTypes.number,
    cols: React.PropTypes.number.isRequired,
    levels: React.PropTypes.number.isRequired,
    material: React.PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);
    this.state = {
    
    }


  }

  componentDidMount() {

  }

  render() {
    const size = this.props.size;
    const rows = _.range(this.props.rows);
    const cols = _.range(this.props.cols);
    const levels = _.range(this.props.levels);
    const points = [];
    const spaceBetween = this.props.spaceBetween || 0;
    const radius = this.props.size/2;

    rows.map((r)=>{
                cols.map((c)=> {
                  levels.map((l)=> {
                      const s = size;
                      const x = r * (s + spaceBetween);
                      const y = c * (s + spaceBetween);
                      const z = l * (s + spaceBetween);
                      points.push({x,y,z})
                  })
                })
              })

    return (
        <Entity position={[0,0,0]}> 
          {points.map((p,ix)=>{
            return (
              <Entity key={ix} geometry={{primitive: this.props.primitive, radius: radius}} material={this.props.material} position={[p.x, p.y, p.z]}/>
            )
          })}
       </Entity>
    );
  }
}

