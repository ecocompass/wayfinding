import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrips } from "../../store/actions/setLocation";
import { Card, Center, ScrollView, Text } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { formatTime } from "../../services/time_to_dest";

const TripHistory = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTrips())
    }, [])
    let trips: any[] = useSelector((state: any) => state.location.tripHistory)
    const totalDistance = (item: any) => {
        let distance = item.distance_bike +
            item.distance_bus +
            item.distance_car +
            item.distance_dart +
            item.distance_luas +
            item.distance_motorcycle +
            item.distance_taxi +
            item.distance_walk;

        return distance.toFixed(2);
    }
    return (
        <ScrollView>
            <Center mt={"$8"}>
                {trips.filter(trip => trip.route !== "0").map(trip =>
                    <Card size="md" variant="elevated" m="$4" mt="$2" width={330}>
                        <HStack space="lg" mt={"$4"}>
                            <Text size="md" mb="$5">{(JSON.parse(trip.start_location)).location_name + ' -> ' + (JSON.parse(trip.end_location)).location_name} </Text>
                        </HStack><HStack space="4xl" mt={"$4"}>
                            <Text size="sm" mb="$5">Time: {formatTime(trip.end_time, trip.start_time)} </Text>
                            <Text size="sm" mb="$5">Distance: {totalDistance(trip)} km </Text>
                        </HStack></Card>)}

            </Center>

        </ScrollView>
    );
}

export default TripHistory;