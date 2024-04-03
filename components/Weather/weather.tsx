import { Image, Text, View } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { weather_url } from "../../constants";
import { setWeather } from "../../store/actions/setLocation";
import { useEffect } from "react";



const WeatherComponent = (props:any={}) => {

    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(setWeather({lat:props.lat,lon:props.lon}))
       
      },[]);
    let weatherData=useSelector((state:any)=> state.weather?.result) || {}
     // weatherData=weatherData.result? weatherData.result:false;
      const weatherUrl=weather_url;
      const temperature = weatherData?.main?.temp ? weatherData.main.temp : 0;
      const icon = weatherData?.weather[0]?.icon ? weatherData.weather[0].icon : '10d';
      
      console.log("weather",weatherData)
    return (
      <View>
    {weatherData ? (
      <>
       <Image
            size="md"
            source={{
                uri: `${weatherUrl}${icon}@2x.png`,
            }} />
        <Text>{temperature}C</Text>
      </>
    ) : (
      <Text>Loading weather data...</Text>
    )}
    </View>
    );
    }
  export default WeatherComponent;