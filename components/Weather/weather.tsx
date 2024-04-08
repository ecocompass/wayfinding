import { Image, Text, View } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { weather_url } from "../../constants";
import { setWeather } from "../../store/actions/setLocation";
import { useEffect } from "react";

const WeatherComponent = (props: any) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWeather({ lat: props.lat, lon: props.lon }))

  }, []);

  let weather = useSelector((state: any) => state.weather.result);
  const weatherData = weather;
  const weatherUrl = weather_url;
  const temperature = weatherData?.main?.temp || '-';
  const icon = weatherData?.weather[0]?.icon || '10d';

  return (
    <View>
      <Image alt="weather"
        size="md"
        source={{
          uri: `${weatherUrl}${icon}@2x.png`,
        }} />
      <Text>{temperature}&deg;C</Text>
    </View>
  );
}

export default WeatherComponent;