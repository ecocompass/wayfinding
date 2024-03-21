import { Box, FlatList, HStack, Text } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";

export const SavedLocations = () => {
  const saved_locations = useSelector((state) => {
    console.log(state.userDetails);
    return state.userDetails.savedLocations;
  });

  
  return (
    <Box p="$5">
      {saved_locations.length ? (
        <Box py="$10">
        <FlatList
          data={saved_locations}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="$1"
              borderColor="$trueGray800"
              $dark-borderColor="$trueGray100"
              $base-pl={0}
              $base-pr={0}
              $sm-pl="$4"
              $sm-pr="$5"
              py="$2"
            >
              <HStack space="md" justifyContent="space-between">
                {item.location_name}
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.location_name}
        />
      </Box>
      ) : (<Text>Your Locations will appear here</Text>)}
    </Box>
  )
};
