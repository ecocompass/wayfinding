import { Image, Text, View } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { weather_url } from "../../constants";
import { setWeather } from "../../store/actions/setLocation";
import { useEffect } from "react";



const WeatherComponent = (props:any) => {
  let {lon, lat} = props
  
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(setWeather({lat:lat,lon:lon}))
      },[]);
    const weatherData=useSelector((state:any)=>{
        return state.location.weather
      })

      const weatherUrl=weather_url;
    return (
    <View>
    <Image
            size="md"
            source={{
                uri: `${weatherUrl}${weatherData ? weatherData.weather[0]?.icon : '10d'}@2x.png`,
            }} /><Text>{weatherData ? (weatherData.main.temp + "C") : "Loading..."}</Text>
            </View>
    );
  };
  
  export default WeatherComponent;