import React, { Component } from 'react'
//import $ from 'jquery';
import axios from 'axios';

export default class Lines extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
        sampleStopList: [],
    }
  }

  componentWillMount () {
    var self = this;
    axios.get('/api/stations')
      .then(function (response) {
    // handle success
      self.setState({sampleStopList: response.data})
      })
      .catch(function (error) {
    // handle error
      console.log(error);
    })
    
  }

  render (){ 
    return (
      <div className="trip-planner-view">
        <div className="selections">
          Start: 
          <select >
            {this.state.sampleStopList.map((e, index) => {
              return <option key={index} value={e.id}>{e.name}</option>;
            })}
          </select>

          <br />

          End: 
          <select >
            {this.state.sampleStopList.map((e, index) => {
              return <option key={index} value={e.id}>{e.name}</option>;
            })}
          </select>

          <br />

          <button>Go!</button>
        </div>

        <div className="directions">
          <div className="directions-summary">
            <p className="line-name">Station A to Station E</p>
            <p>31 minutes (arrive at 5:51pm)</p>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Start at Station A</p>
            </div>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <div className="line-circle" style={{backgroundColor: "#ed1d24"}}></div>
              <p className="line-name">Red Line</p>
              <p className="line-direction">towards Station C</p>
            </div>
            <ul>
              <li> Station A </li>
              <li> Station B </li>
              <li> Station C </li>
            </ul>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Change Trains</p>
            </div>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <div className="line-circle" style={{backgroundColor: "#0099cc"}}></div>
              <p className="line-name">Blue Line</p>
              <p className="line-direction">towards Station F</p>
            </div>
            <ul>
              <li> Station C </li>
              <li> Station D </li>
              <li> Station E </li>
            </ul>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Arrive at Station E</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 