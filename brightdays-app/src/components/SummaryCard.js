import moment from 'moment'

function SummaryCard({day}) {
    let day_icon = `${'http://openweathermap.org/img/w/' + day.weather[0]["icon"]}.png`
    return (
        <li style={{background: 'white',minWidth:200,maxWidth:200,height:217, boxShadow: '1px 2px 20px 4px #bfbdbd', marginRight: 15}}
            className="container p-4 flex items-center justify-center bg-gray-200 rounded-lg my-auto mr-1">
            <div className="my-auto">
                <p className="font-bold text-3xl text-pink-700 mb-2">{Math.round(day.temp.day-273.15)}&deg;C</p>
                <p className="text-2xl text-gray-800 tracking-widest">{day.weather[0].main}
                    <img src={day_icon} className="w-1/4 inline" />
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{day.weather[0].description}</p>
                <p className="tracking-wider">{moment(day.dt*1000).format("dddd hh:mm")}am</p>
            </div>
        </li>
    )
}

export default SummaryCard
