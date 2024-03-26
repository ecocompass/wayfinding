/* eslint-disable react/react-in-jsx-scope */
import {
  HStack,
  ScrollView,
  VStack,
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
  Text,
  Icon,
} from '@gluestack-ui/themed';
import {
  MoveLeft,
  Play,
  X,
  PlusIcon,
  MinusIcon,
  FootprintsIcon,
  BusIcon,
  TramFrontIcon,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateViewMode,
  updateViewedPath,
} from '../../store/actions/setLocation';
import { VIEWMODE } from '../../constants';
import { getTimeFromDistance } from '../../services/time_to_dest';
import { getPathInstructions } from '../../services/path_processor';

export const PreviewNavigate = (props: any) => {
  const { onRender, onPointsRender, destinationName } = props;

  const paths = useSelector((state) => {
    return state.location.recommendedRoutes.options;
  });

  let [pathInstructions, setPathInstructions] = useState<any>([]);

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

  const getArrivalTime = (timeStr) => {
    let timeInms = +timeStr * 60 * 1000;
    let arrivalTime = new Date(Date.now() + timeInms).toLocaleTimeString();
    return arrivalTime;
  };

  useEffect(() => {
    // props.onRender(routes.walk);
    paths.forEach((path) => {
      if (path.isViewed) {
        onRender(path.modePathList);
        // onPointsRender(path.modePathList);
        setPathInstructions(getPathInstructions(path, destinationName));
      }
    });
  }, [paths, onRender, onPointsRender, destinationName, setPathInstructions]);

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
        h="$50"
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
              bg={item.isViewed ? '$primary50' : 'transparent'}
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
                <Text>
                  {getTimeFromDistance(item.pathDistance, item.displayModes)}{" "}
                  mins
                </Text>
                {/*  */}
              </HStack>

              {item.isViewed ? (
                <>
                  <Box
                    padding="$2"
                    borderRadius="$md"
                    borderWidth="$1"
                    margin="$2"
                    borderColor="$primary500"
                    borderStyle="dashed"
                  >
                    {pathInstructions.map((inst: any, index) => {
                      return (
                        <HStack
                          key={index}
                          id={`${index}`}
                          marginTop="$1"
                          justifyContent="space-between"
                        >
                          <Text> {inst.instruction} </Text>
                          <Text> {inst.time} </Text>
                        </HStack>
                      );
                    })}
                  </Box>
                  <HStack justifyContent='space-between' margin="$2" alignItems='center'>
                    <Button
                      size="md"
                      variant="solid"
                      action="positive"
                      width="$1/3"
                    >
                      <ButtonText>Let's Go </ButtonText>
                      <ButtonIcon as={Play} />
                    </Button>
                    <Box>
                      <Text>Arrive By : {getArrivalTime(getTimeFromDistance(item.pathDistance, item.displayModes))}</Text>
                    </Box>
                  </HStack>
                </>
              ) : null}
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.pathId}
      />
    </Box>
  );
};
