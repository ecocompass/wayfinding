/* eslint-disable react/react-in-jsx-scope */
import {
  HStack,
  ScrollView,
  VStack,
  Text,
  Heading,
  Pressable,
  Box,
  FlatList,
  Avatar,
  Button,
  ButtonText,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { MoveLeft, Play, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateViewMode } from "../../store/actions/setLocation";
import { VIEWMODE } from "../../constants";

export const PreviewNavigate = (props: any) => {
  const routes = useSelector((state) => {
    return state.location.routes;
  });

  const [paths, setPaths] = useState([
    {
      id: 1,
      mode: 'Walk',
      isSelected: true,
    },
    {
      id: 2,
      mode: 'Drive',
      isSelected: false,
    },
    {
      id: 3,
      mode: 'Cycle',
      isSelected: false,
    },
    {
      id: 4,
      mode: 'Taxi',
      isSelected: false,
    },
  ]);

  const dispatch = useDispatch();

  const updatePath = (pathId) => {
    setPaths(
      paths.map((p) => {
        if (p.id === pathId) {
          return { ...p, isSelected: true };
        } else {
          return { ...p, isSelected: false };
        }
      })
    );
  };

  const updateView = () => {
    dispatch(updateViewMode(VIEWMODE.search));
  };

  useEffect(() => {
    props.onRender(routes.walk);
  });


  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="center" p="$4">
        <Heading size="xl" pb="$3">
          Routes
        </Heading>
        <Button
          size="md"
          variant="solid"
          action="negative"
          variant="solid"
          onPress={() => {
            updateView();
          }}
        >
          <ButtonIcon as={X} />
        </Button>
      </HStack>
      <FlatList
        h="$48"
        data={paths}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              updatePath(item.id);
            }}
          >
            <Box
              borderBottomWidth="$1"
              borderColor="$trueGray300"
              $dark-borderColor="$trueGray100"
              $base-pl={0}
              $base-pr={0}
              py="$4"
              bg={item.isSelected ? "$primary100" : "transparent"}
            >
              <HStack
                space="md"
                justifyContent="space-between"
                alignItems="center"
                px="$4"
              >
                <Text
                  color="$coolGray800"
                  fontWeight="$bold"
                  $dark-color="$warmGray100"
                >
                  {item.mode}
                </Text>
                <Button size="md" variant="solid" action="positive">
                  <ButtonText>Go </ButtonText>
                  <ButtonIcon as={Play} />
                </Button>
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};