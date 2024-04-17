import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffline } from "../../store/actions/setLocation";
import { View } from "react-native";
import { Image } from "@gluestack-ui/themed";

const OfflineMap=()=>{
    const dispatch=useDispatch();

    useEffect(()=>{
       dispatch(getOffline()); 
    },[])
    const offlineObj=useSelector((state:any)=>state.location.offline)
    console.log("offline map?")
    return (<View>
        {offlineObj?(<Image h={'100%'} w={'100%'} alt="Image" source={{uri:offlineObj.payload}}/>):<></>}
    </View>);
}

export default OfflineMap;