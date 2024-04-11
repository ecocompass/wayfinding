import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrips, setTrips } from "../../store/actions/setLocation";
import { Card } from "@gluestack-ui/themed";
import { View } from "react-native";

const TripHistory = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTrips())
    }, [])
    const trips=useSelector((state:any)=>{state.location.tripHistory})
    return (
        <View>
            <Card>
                
            </Card>
        </View>
    );
}

export default TripHistory;