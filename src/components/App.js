import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";

import "./App.css";

const APIKey = `c3bcfbffa2a024b760b6cf71376d28ef`;

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: false
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleCitySubmit = e => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&APPID=${APIKey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("Coś poszło nie tak");
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString();
        this.setState({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: this.state.value
        });
      })
      .catch(err => {
        this.setState({
          err: true,
          city: this.state.value
        });
      });
  };

  render() {
    return (
      <div className="App">
        <Form
          submit={this.handleCitySubmit}
          value={this.state.value}
          change={this.handleInputChange}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
