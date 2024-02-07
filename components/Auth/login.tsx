import { Button } from "react-native";

const Auth = ({ navigation }: any) => {
  return (
    <Button
      title="Go to Map"
      onPress={() => {
        navigation.navigate("Map");
      }}
    />
  );
};
export default Auth;
