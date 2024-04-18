import { Image, Text, View, HStack } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { weather_url } from "../../constants";
import { setWeather } from "../../store/actions/setLocation";
import { useEffect } from "react";

const WeatherComponent = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWeather({ lat: 53.3498, lon: -6.2603 }))

  }, []);

  let weather = useSelector((state: any) => state.weather.result);
  const weatherData = weather;
  const weatherUrl = weather_url;
  const temperature = weatherData?.main?.temp || '-';
  const icon = weatherData?.weather[0]?.icon || '10d';

  return (
    <HStack alignItems="center">
      <Image alt="weather"
        size="md"
        source={{
          uri: `${weatherUrl}${icon}@2x.png`,
        }} />
      <Text>{temperature}&deg;C</Text>
    </HStack>
  );
}

export default WeatherComponent;