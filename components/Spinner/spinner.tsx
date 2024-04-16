import { Spinner } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
const style = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1000,
    flex: 1,
    height: '100%',
    width: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.5);',
  },
});
const SpinnerComponent = () => {
  const show = useSelector((state: any) => {
    return state.spinner.show;
  });
  return (
    <Spinner
      size="large"
      display={show ? 'flex' : 'none'}
      style={style.container}
    />
  );
};

export default SpinnerComponent;
