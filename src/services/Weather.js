const API_KEY = "10b97df9f283373d51a932291aa0a720";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData=(infoType, searchParams)=>{
    const url=new URL(BASE_URL+infoType);
    url.search=new URLSearchParams({...searchParams,appid:API_KEY});
    return fetch(url)
        .then((res) =>res.json())
        .then((data)=>data);
    
}
function convertTimezone(timestamp, offsetInSeconds){
    let date = new Date((timestamp + offsetInSeconds) * 1000);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12 || 12).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds} ${period}`;

}
function convertToDate(timestamp, offsetInSeconds) {
    let date = new Date((timestamp + offsetInSeconds) * 1000);
    return date.toLocaleString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

const getIcon=(icon)=>{
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

const formatData=(data)=>{
     //console.log(data);
    const {
        coord:{lon,lat},
        main:{temp,feels_like, temp_min, temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed},
        timezone
    }=data;
    const {main:details,icon,id,desc}=weather[0];
    const date = convertToDate(dt,timezone);;
    const time=convertTimezone(dt,timezone);
    return(
       { temp,feels_like,
        temp_min,temp_max,
        name,country,
        sunrise:convertTimezone(sunrise,timezone),
        sunset:convertTimezone(sunset,timezone),
        speed,
        details,
        icon:getIcon(icon),
        date,
        dt,
        time,
        timezone,lat,lon,
        id,desc
    }
    )
}

const formatForecastData=(secs,offset,data)=>{
    // console.log(data);
    //hourly
    const hourly=data.filter(f=>f.dt>secs).slice(0,5).map((f)=>(
        {
            temp:f.main.temp,
            title:convertTimezone(f.dt,offset).slice(0,5)+convertTimezone(f.dt,offset).slice(8),
            icon:getIcon(f.weather[0].icon),
            date:f.dt_txt
        }
    ))
    const daily=data.filter(f=>f.dt_txt.slice(-8)==="00:00:00").map((f)=>(
        {
            temp:f.main.temp,
            title:convertToDate(f.dt,offset).split(',')[0],
            icon:getIcon(f.weather[0].icon),
            date:f.dt_txt
        }
    ))
    return {hourly,daily};
}
const weatherData=async(searchParams)=>{
    const curData=await getWeatherData("weather",searchParams).then(formatData);

    const {dt,timezone,lat,lon}=curData;
    const forcastWeather=await getWeatherData("forecast",{lat,lon,units:searchParams.units}).then(
        (d)=>formatForecastData(dt,timezone,d.list)
    );

    return {...curData,...forcastWeather};
}

//---------------------FORECAST--------------


export default weatherData;