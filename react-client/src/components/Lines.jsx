import React, { Component } from "react";
//import $ from 'jquery';
import axios from "axios";

export default class Lines extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sampleLines: [],
      sampleStopList: [],
      lineId: "",
      fav: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var self = this;
    self.setState({ lineId: event.target.value });
    axios
      .get("/api/lines/" + self.state.lineId)
      .then(function(response) {
        // handle success
        console.log(response);
        self.setState({ sampleStopList: response.data });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  toggleFav(e, key) {
    var self = this;
    self.state.sampleStopList[key].is_favorite =
      self.state.sampleStopList[key].is_favorite == 1 ? 0 : 1;
    self.setState({ sampleStopList: [...self.state.sampleStopList] });

    axios
      .post("/", {
        id: e.id,
        val: self.state.sampleStopList[key].is_favorite
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    var self = this;

    axios
      .get("/api/lines")
      .then(function(response) {
        // handle success

        self.setState({ sampleLines: response.data });
        self.setState({ lineId: self.state.sampleLines[0].id });

        axios
          .get("/api/lines/" + response.data[0].id)
          .then(function(resp) {
            // handle success
            console.log(resp);
            self.setState({ sampleStopList: resp.data });
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
      })

      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="lines-view">
        <div className="selections">
          Choose a line:
          <select onChange={this.handleChange}>
            {this.state.sampleLines.map((e, index) => {
              return (
                <option key={index} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="lines-stop-list">
          <ul>
            {this.state.sampleStopList.map((e, index) => {
              return (
                <li key={index} value={e.id}>
                  {e.name}{" "}
                  <span>
                    <i
                      className={
                        e.is_favorite == 1 ? "fa fa-heart" : "fa fa-heart-o"
                      }
                      onClick={() => this.toggleFav(e, index)}
                    />
                  </span>{" "}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
