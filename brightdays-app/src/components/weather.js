import React from 'react';
import { Card } from 'react-bootstrap';
import './styles.css';
import moment from 'moment';
import { Button } from 'semantic-ui-react';

const refresh = () => {
  window.location.reload();
}

const Weather = ({weatherData}) => (
<div className="main">

  <Card style={{ width: '48rem' }}>
    <Card.Body>
    <div className="top">
      <Card.Title>
        <p className="header">{weatherData.name}</p>
      </Card.Title>
      <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
    </div>

      <Card.Text>
      <div className="flex">
        <p className="day">Day: {moment().format('dddd')}</p>
        <p className="day">Date: {moment().format('LL')}</p>
      </div>

      <div className="flex">
        <p className="temp">Temprature: {weatherData.main.temp-273.15} &deg;C</p>
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
      </div>

      <div className="flex">
        <p className="description">Description: {weatherData.weather[0].description}</p>
      </div>

      </Card.Text>
    </Card.Body>
  </Card>
</div>
)

export default Weather;
