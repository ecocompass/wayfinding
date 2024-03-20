import { Box, Text } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";

export const SavedLocations = () => {
  const saved_locations = useSelector((state) => {
    return state.userDetails.savedLocations;
  });
  return (
    <Box p="$5">
      {saved_locations.length ? (<Text>Locations</Text>) : (<Text>Your Locations will appear here</Text>)}
    </Box>
  )
};
