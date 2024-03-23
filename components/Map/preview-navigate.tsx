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
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
  AccordionTrigger,
  Divider,
  Icon,
} from "@gluestack-ui/themed";
import {
  MoveLeft,
  Play,
  X,
  PlusIcon,
  MinusIcon,
  FootprintsIcon,
  BusIcon,
  TramFrontIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateViewMode, updateViewedPath } from "../../store/actions/setLocation";
import { VIEWMODE } from "../../constants";
import { getTimeFromDistance } from "../../services/time_to_dest";

export const PreviewNavigate = (props: any) => {
  const paths = useSelector((state) => {
    return state.location.recommendedRoutes.options;
  });

  const iconMap = {
    walk: FootprintsIcon,
    bus: BusIcon,
    luas: TramFrontIcon,
  };

  const dispatch = useDispatch();

  const updatePath = (pathId) => {
    dispatch(updateViewedPath(pathId));
  };

  const updateView = () => {
    dispatch(updateViewMode(VIEWMODE.search));
  };

  useEffect(() => {
    // props.onRender(routes.walk);
    paths.forEach((path) => {
      if (path.isViewed) {
        props.onRender(path.modePathList);
      }
    });
  });

  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="center" p="$4">
        <Heading size="xl" pb="$3">
          Your Options
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
              updatePath(item.pathId);
            }}
          >
            <Box
              borderBottomWidth="$1"
              borderColor="$trueGray300"
              $dark-borderColor="$trueGray100"
              $base-pl={0}
              $base-pr={0}
              py="$4"
              bg={item.isViewed ? "$primary100" : "transparent"}
            >
              <HStack
                space="md"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                px="$4"
              >
                <Text
                  color="$coolGray800"
                  fontWeight="$bold"
                  $dark-color="$warmGray100"
                >
                  {item.displayModes.map((mode, i) => {
                    if (mode.length) {
                      return (
                        <HStack
                          space="md"
                          justifyContent="space-between"
                          alignItems="center"
                          key={i}
                        >
                          <Icon as={iconMap[mode]} m="$2" size="xl" />
                        </HStack>
                      );
                    }
                  })}
                </Text>
                <Text>{getTimeFromDistance(item.pathDistance, item.displayModes)} mins</Text>
                {/* <Button size="md" variant="solid" action="positive">
                  <ButtonText>Go </ButtonText>
                  <ButtonIcon as={Play} />
                </Button> */}
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.pathId}
      />
    </Box>
  );
};
