import React, { useEffect, useState, useRef } from "react";
import DetailCard from "./components/DetailCard";
import Header from "./components/Header";
import lodash from "lodash";
import SummaryCard from "./components/SummaryCard";
import PerfectScrollbar from "perfect-scrollbar";
import cloud from './assets/cloud-bg.jpg';


function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=51.507351&lon=-0.127758&appid=7abffaba122c74b731a552a7299e3551';
  const REACT_APP_API_KEY = '7abffaba122c74b731a552a7299e3551';
  const REACT_APP_ICON_URL = 'https://openweathermap.org/img/w/';

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(myIP)
    // myIP({coords:{
    //     latitude:51.5085, longitude:-0.1257
    //   }})
  },[])

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  let timeRef = useRef()
  const [noData, setNoData] = useState('No Data Yet')
  const [searchTerm, setSearchTerm] = useState('London')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('London')
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`)


  console.log("weatherIcon",weatherIcon)
  const handleChange = input => {
    const {value} = input.target
    setSearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.search_term.value)
    setSearchTerm(e.target.search_term.value)
  }
  const getWeather = async (location) => {

    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`
    try {
      let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${how_to_search}&appid=7abffaba122c74b731a552a7299e3551`)
      let data =  await res.json();
      if(data.cod !== 200) {
        setNoData('Location Not Found')
        return
      }
      // console.log('hoursData',hoursData)
      const lat = parseInt(lodash.get(data,'coord.lat'));
      const lon = parseInt(lodash.get(data,'coord.lon'));
      let listData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=7abffaba122c74b731a552a7299e3551`)
      const list =  await listData.json();
      // if(list.cod !== 200) {
      //   setNoData('Location Not Found')
      //   return
      // }
      console.log('list',list)
      setSearchTerm('');
      setWeatherData(list.daily)
      setCity(`${data.name}, ${data.sys.country}`)
      // setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`)
    } catch (error) {
      console.log(error)
    }
  }
  // useEffect(() => {
  //     getWeather(searchTerm)
  // }, [searchTerm])

  const myIP = (location) => {
    console.log('location',location)
    const {latitude, longitude} = location.coords
    getWeather([latitude, longitude])
  }


  return (
    <div className="bg-gray-800 items-center justify-center w-screen h-screen py-10" style={{height:"120%", fontFamily:'custom-own'}}>
      <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
          {/* form card section  */}
        <div className="form-container">
          <div className="flex items-center justify-center">
            <h3 className="my-auto mr-auto text-xl text-yellow-600 font-semibold shadow-md py-1 px-3
            rounded-md bg-white bg-opacity-30">Forecast</h3>
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
            <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-left">
                <p className="font-semibold text-sm ml-2 my-auto">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-3xl text-center font-semibold">The Only Weather Forecast You Need</h1>
            <h1 className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
              <input type="text"
                placeholder="Enter location"
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-30 text-white placeholder-gray-200"
                onChange={handleChange}
                value={searchTerm}
                required />
                <button type="submit" className="z-10">
                  <i className="fa fa-search text-white -ml-12 border-l my-auto z-10 cursor-pointer p-3"
                  aria-hidden="true" type="submit" onClick={()=>getWeather(searchTerm)}></i>
                </button>
              <i className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white" aria-hidden="true" onClick={() => {
                navigator.geolocation.getCurrentPosition(myIP)
              }}></i>
            </form>
          </div>
        </div>
        {/* info card section  */}
        <div className="w-2/4 p-5">
          <Header />
          <div className="flex flex-col my-10">
            {/* card jsx  */}
            {weatherData.length === 0 ?
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-gray-300 text-4xl font-bold uppercase">{noData}</h1>
              </div>:
              <>
                <h1 className="text-5xl text-gray-800 mt-auto mb-4 font-bold">Today</h1>
                <DetailCard weatherIcon={weatherIcon} data={weatherData} />
                <br></br>
                <h1 className="text-2xl text-gray-600 font-bold mb-4 mt-10">More On {city}</h1>
                <ul className="ul-list grid grid-cols-2  gap-2"  style={{}}>
                  {
                    weatherData.map( (days, index) => {
                    if(index > 0){
                    return (
                      <SummaryCard key={index} day={days} />
                    )
                  }
                  })
                }
                </ul>
              </>
            }
          </div>
        </div>
      </div>
      <br></br>

    </div>
  );
}



export default App;
