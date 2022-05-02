import moment from 'moment';

function DetailCard({weather_icon, data}) {
    const item = data[0]

    return (
        <div style={{display:'flex',justifyContent:'space-around'}}
            className="container p-4 flex items-center justify-center shadow-lg rounded-lg bg-white h-1/3 mb-auto">
            <div className="my-auto">
                <p className="font-bold text-5xl text-pink-700 mb-2">{Math.round(item.temp.day-273.15)}&deg;C</p>
                <p className="text-4xl text-gray-800 tracking-widest">{item.weather[0].main}
                    <img src={'http://openweathermap.org/img/w/'+item.weather[0].icon+'.png'} className="w-1/3 inline" />
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{item.weather[0].description}</p>
                <p className="tracking-wider">{moment().format("dddd MMM YYYY")}</p>
            </div>
            <div className="my-1 border-l-2 border-gray-100 p-2">
                <p className="text-gray-400 text-lg" style={{marginLeft: 30}}>RealFeel: {Math.round(item.feels_like.day-273.15)}&deg;C</p>
                <p className="text-gray-400 text-lg" style={{marginLeft: 30}}>Humidity: {item.humidity}%</p>
                <p className="text-gray-400 text-lg" style={{marginLeft: 30}}>Cloud Cover: {item.clouds}%</p>
                <p className="text-gray-400 text-lg" style={{marginLeft: 30}}>Min Temp: {Math.round(item.temp.min-273.15)}&deg;C</p>
                <p className="text-gray-400 text-lg" style={{marginLeft: 30}}>Max Temp: {Math.round(item.temp.max-273.15)}&deg;C</p>
            </div>
        </div>
    )
}



export default DetailCard
