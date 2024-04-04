import { Spinner } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
const style = StyleSheet.create({
    container: {
        left: "45%",
        top: "50%",
        position: "absolute",
        zIndex: 1000
    }
})
const SpinnerComponent = () => {
    const show = useSelector((state: any) => { return state.spinner.show });
    return (<Spinner size="large" display={show ? "flex" : "none"} style={style.container} />
    )
}

export default SpinnerComponent;