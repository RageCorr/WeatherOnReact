import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Омск", zip: "Omsk,ru" },
  { name: "Новосибириск", zip: "Novosibirsk,ru" },
  { name: "Томск", zip: "Tomsk,ru" },
  { name: "Тюмень", zip: "Tumen,ru" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" + zip + "&appid=fa205c857a7b86f5273616a0d6f4a1aa";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Загрузка</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Текущая: {weatherData.main.temp - 273.15}C°</p>
        <p>Максимальная: {weatherData.main.temp_max - 273.15}C°</p>
        <p>Минимальная: {weatherData.main.temp_min - 273.15}C°</p>
        <p>Скорость ветра: {weatherData.wind.speed} М/С</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Простое погодное приложение на React
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Выберите город</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;