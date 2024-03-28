/* eslint-disable react/react-in-jsx-scope */
import {
  HStack,
  ScrollView,
  VStack,
  Heading,
  Pressable,
  Box,
  FlatList,
  Button,
  ButtonText,
  ButtonIcon,
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
  CheckCircle,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPaths,
  updateViewMode,
  updateViewedPath,
} from '../../store/actions/setLocation';
import { VIEWMODE } from '../../constants';
import { getTimeFromDistance } from '../../services/time_to_dest';
import { getPathInstructions } from '../../services/path_processor';
import { View } from 'react-native';

export const PreviewNavigate = (props: any) => {
  const { onRender, onPointsRender, destinationName, camRef } = props;

  let viewMode = useSelector((state: any) => {
    return state.location.viewMode;
  });

  const paths = useSelector((state) => {
    return state.location.recommendedRoutes.options;
  });

  let [pathInstructions, setPathInstructions] = useState<any>([]);
  let [pathSegments, setPathSegments] = useState<any>([]);

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
    dispatch(resetPaths());
    onRender([]);
  };

  const getArrivalTime = (timeStr) => {
    let timeInms = +timeStr * 60 * 1000;
    let arrivalTime = new Date(Date.now() + timeInms).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
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

    if (viewMode === VIEWMODE.navigate) {
      setPathOnCam();
    }
  }, [paths, onRender, onPointsRender, destinationName, setPathInstructions]);

  const startNavigation = (selectedPath: any) => {
    dispatch(updateViewMode(VIEWMODE.navigate));
    let segments: any = [];
    selectedPath.modePathList.forEach((path, index) => {
      segments.push({
        instruction: pathInstructions[index].instruction,
        timeTaken: pathInstructions[index].time,
        pathPointList: path.pathPointList,
        isCleared: pathInstructions[index].isCleared,
        isActive: index ? false : true,
        pathId: `${index}`,
      });
    });

    setPathSegments(segments);
  };

  const setPathOnCam = () => {
    pathSegments.forEach((segment: any) => {
      if (segment.isActive) {
        this.camRef.fitBounds(
          segment.pathPointList[0],
          segment.pathPointList[segment.pathPointList.length - 1],
          [120, 120],
          500
        );
      }
    });
  };

  switch (viewMode) {
    case VIEWMODE.preview:
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
                      {getTimeFromDistance(
                        item.pathDistance,
                        item.displayModes
                      )}{" "}
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
                              <Text flexBasis="auto"> {inst.instruction} </Text>
                              <Text> {inst.time} </Text>
                            </HStack>
                          );
                        })}
                      </Box>
                      <HStack
                        justifyContent="space-between"
                        margin="$2"
                        alignItems="center"
                      >
                        <Button
                          size="md"
                          variant="solid"
                          action="positive"
                          width="$1/3"
                          onPress={() => {
                            startNavigation(item);
                          }}
                        >
                          <ButtonText>Let's Go </ButtonText>
                          <ButtonIcon as={Play} />
                        </Button>
                        <Box>
                          <Text>
                            Arrive By :{' '}
                            {getArrivalTime(
                              getTimeFromDistance(
                                item.pathDistance,
                                item.displayModes
                              )
                            )}
                          </Text>
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
    case VIEWMODE.navigate:
      return (
        <Box>
          <HStack justifyContent="space-between" alignItems="center" p="$4">
            <Heading size="md" pb="$3">
              Estimated Arrival : 4:20pm
            </Heading>
            <Button
              size="sm"
              variant="solid"
              action="negative"
              variant="solid"
              onPress={() => {
                updateView();
              }}
            >
              <ButtonText> Cancel </ButtonText>
              <ButtonIcon as={X} />
            </Button>
          </HStack>
          <FlatList
            h="$50"
            data={pathSegments}
            renderItem={({ item }) => (
              <Box
                key={item.pathId}
                borderBottomWidth="$1"
                borderColor="$trueGray300"
                $dark-borderColor="$trueGray100"
                $base-pl={0}
                $base-pr={0}
                py="$4"
                bg={item.isActive ? 'transparent' : "$trueGray300"}
              >
                <HStack
                  space="md"
                  justifyContent={
                    item.isActive ? 'space-around' : 'space-between'
                  }
                  alignItems="center"
                  flexWrap="wrap"
                  px="$4"
                >
                  {item.isActive ? (
                    <HStack
                      padding="$4"
                      borderRadius="$md"
                      borderWidth="$1"
                      borderColor="$success500"
                      borderStyle="dashed"
                      bg="$success100"
                      w="$5/6"
                      justifyContent="space-between"
                    >
                      <Text
                        color="$coolGray800"
                        fontWeight="$bold"
                        $dark-color="$warmGray100"
                        w="$4/6"
                      >
                        {item.instruction}
                      </Text>
                      <Text>{item.timeTaken}</Text>
                    </HStack>
                  ) : (
                    <>
                      <Text color="$coolGray100" $dark-color="$warmGray50">
                        {item.instruction}
                        {item.isCleared ? <Icon as={CheckCircle} size="lg" color="$success500"/> : <></>}
                      </Text>
                      <Text>{item.timeTaken}</Text>
                    </>
                  )}
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.pathId}
          />
        </Box>
      );
  }
};
