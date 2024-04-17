import { Box, FlatList, HStack, Pressable, Text, Badge, BadgeIcon, BadgeText } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { MapPin } from 'lucide-react-native';
import { setCenter } from "../../store/actions/setLocation";

export const SavedLocations = ({ navigation }) => {
  const saved_locations = useSelector((state: any) => {
    return state.userDetails.savedLocations;
  });

  const dispatch = useDispatch();

  const displayLocation = (loc: any) => {
    dispatch(setCenter([loc.longitude, loc.latitude]));
    navigation.navigate('Map', { isFromSaved: true, locData: [loc.longitude, loc.latitude] });
  };

  return (
    <Box p="$5">
      {saved_locations.length ? (
        <Box py="$5">
          <FlatList
            data={saved_locations}
            renderItem={({ item }) => (
              <Pressable onPress={() => { displayLocation(item) }}>
                <Box
                  borderBottomWidth="$1"
                  borderColor="$trueGray300"
                  $dark-borderColor="$trueGray100"
                  $base-pl={0}
                  $base-pr={0}
                  py="$5"
                >
                  <HStack space="md" justifyContent="space-between">
                    <Text>
                      {item.location_name}
                    </Text>
                    <Box>
                      <Badge size="lg" variant="solid" borderRadius="$none" action="info">
                        <BadgeText>{item.longitude}, {item.latitude}</BadgeText>
                        <BadgeIcon as={MapPin} ml="$2" />
                      </Badge>
                    </Box>
                  </HStack>
                </Box>
              </Pressable>

            )}
            keyExtractor={(item: any) => item.location_name}
          />
        </Box>
      ) : (<Text>Your Locations will appear here</Text>)}
    </Box>
  )
};
