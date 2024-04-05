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
  Card,
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
  Check,
  CarFrontIcon,
  BikeIcon,
  CheckCircleIcon,
  ReplyIcon,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetPaths,
  saveTripAPI,
  setCenter,
  updateUserDirectionView,
  updateViewMode,
  updateViewedPath,
} from '../../store/actions/setLocation';
import { VIEWMODE } from '../../constants';
import { getTimeFromDistance } from '../../services/time_to_dest';
import {
  getPathInstructions,
  getUserPositionInSegment,
  processPathCleared,
} from '../../services/path_processor';
import { View } from 'react-native';

export const PreviewNavigate = (props: any) => {
  const { onRender, onPointsRender, destinationName, camRef } = props;

  let currentUserLocation = useSelector((state: any) => {
    if (viewMode === VIEWMODE.navigate) {
      // dispatch(setCenter(state.location.userLocation));
      // console.log(state.location.userLocation);
    }
    return state.location.userLocation;
  });

  let viewMode = useSelector((state: any) => {
    return state.location.viewMode;
  });

  const paths = useSelector((state) => {
    return state.location.recommendedRoutes.options;
  });

  const tripDetails = useSelector((state) => {
    return state.location.tripDetails;
  });

  let [pathInstructions, setPathInstructions] = useState<any>([]);
  let [pathSegments, setPathSegments] = useState<any>([]);
  let [userPositionOnPath, setUserPositionOnPath] = useState<any>(0);

  const iconMap = {
    walk: FootprintsIcon,
    bus: BusIcon,
    luas: TramFrontIcon,
    car: CarFrontIcon,
    bike: BikeIcon,
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

  const formatTime = (end, start) => {
    let diff = end - start
    let mins = Math.trunc(diff/1000/60);
    let hours = 0
    if(mins < 60) {
      return `${mins} Mins`;
    } else {
      hours = Math.trunc(diff/1000/60/60);
      mins = Math.trunc(diff%(1000*60*60)/1000/60);
      return `${hours} Hrs ${mins} Mins`;
    }
  }

  useEffect(() => {
    if (viewMode === VIEWMODE.preview) {
      paths.forEach((path) => {
        if (path.isViewed) {
          onRender(path.modePathList);
          setPathInstructions(getPathInstructions(path, destinationName));
        }
      });
    }

    if (viewMode === VIEWMODE.navigate) {
      let tempActiveSegment: any = {};
      let isFinalSegment = false;

      pathSegments.forEach((segment: any, index) => {
        if (segment.isActive) {
          tempActiveSegment = segment;
          if (index === pathSegments.length - 1) {
            isFinalSegment = true;
          }
        }
      });

      this.camRef.fitBounds(
        tempActiveSegment.pathPointList[0],
        tempActiveSegment.pathPointList[
          tempActiveSegment.pathPointList.length - 1
        ],
        [120, 120],
        500
      );

      let positionUpdate = processPathCleared(
        tempActiveSegment.pathPointList,
        currentUserLocation,
        userPositionOnPath,
        isFinalSegment
      );
      console.log(positionUpdate.action)
      switch (positionUpdate.action) {
        case 'UPDATE':
          setUserPositionOnPath(positionUpdate.payload);
          break;
        case 'CHANGESEGMENT':
          let currentActiveSegmentIndex = 0;
          pathSegments.forEach((ps: any, index: number) => {
            if (ps.isActive) {
              currentActiveSegmentIndex = index;
            }
          });

          let tempPathSegments = pathSegments.map((ps, index) => {
            return {
              ...ps,
              isActive: index === currentActiveSegmentIndex + 1 ? true : false,
              isCleared: ps.isCleared
                ? true
                : index === currentActiveSegmentIndex
                ? true
                : false,
            };
          });

          // userPositionOnPath[0] = 0;
          setUserPositionOnPath(0);
          setPathSegments(tempPathSegments);
          break;
        case 'ENDTRIP':
          dispatch(updateViewMode(VIEWMODE.navigateEnd));
          break;
        default:
          return;
      }
    }

    if (viewMode === VIEWMODE.navigateEnd) {
      // handleEndTrip();
      let pathTaken: any = {};
      paths.forEach((p: any) => {
        if (p.isViewed) {
          pathTaken = p;
        }
      });
      let distances: any = {};
      pathTaken.modePathList.forEach((m: any) => {
        if (distances[`distance_${m.mode}`]) {
          distances[`distance_${m.mode}`] += m.distance;
        } else {
          distances[`distance_${m.mode}`] = m.distance;
        }
      });

      let data = {
        route: pathTaken,
        startLocation: tripDetails.startLocation,
        endLocation: tripDetails.endLocation,
        ...distances,
        endTime: new Date().getTime(),
        startTime: tripDetails.startTime,
      };
      this.camRef.fitBounds(
        tripDetails.startLocation.coordinates,
        tripDetails.endLocation.coordinates,
        [120, 120],
        500
      );
      dispatch(saveTripAPI(data));
    }
  }, [
    paths,
    onRender,
    onPointsRender,
    destinationName,
    setPathInstructions,
    viewMode,
    currentUserLocation,
    userPositionOnPath,
    setUserPositionOnPath,
    pathSegments,
    dispatch,
    tripDetails,
  ]);

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

    let tempActiveSegment: any = {};

    segments.forEach((segment: any) => {
      if (segment.isActive) {
        tempActiveSegment = segment;
      }
    });

    let tp = getUserPositionInSegment(
      tempActiveSegment.pathPointList,
      currentUserLocation
    );

    // userPositionOnPath[0] = tp;
    setUserPositionOnPath(tp)
    setPathSegments(segments);
    props.onTripStart(currentUserLocation);
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
              onPress={() => {
                updateView();
              }}
            >
              <ButtonIcon as={X} />
            </Button>
          </HStack>
          <FlatList
            h="$56"
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
              Estimated Arrival :
            </Heading>
            <Button
              size="sm"
              variant="solid"
              action="negative"
              onPress={() => {
                updateView();
              }}
            >
              <ButtonText> Exit </ButtonText>
              <ButtonIcon as={X} />
            </Button>
          </HStack>
          <FlatList
            h="$48"
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
                        {item.isCleared ? (
                          <Icon
                            as={CheckCircle}
                            size="lg"
                            color="$success500"
                          />
                        ) : (
                          <></>
                        )}
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
    case VIEWMODE.navigateEnd:
      return (
        <Box>
          <HStack justifyContent="space-between" alignItems="center" p="$4">
            <Heading size="md" pb="$3">
              You Have Arrived!
            </Heading>
          </HStack>
          <Card size="md" variant="elevated" m="$2">
            <HStack space="4xl">
              <Heading mb="$1" size="md">
                {tripDetails.startLocation.location_name} to{" "}
                {tripDetails.endLocation.location_name}{" "}
                {tripDetails.endTime
                  ? `${formatTime(tripDetails.endTime, tripDetails.startTime)}`
                  : ""}
              </Heading>
            </HStack>
            <Text size="sm" mb="$5"> </Text>
            <HStack>
              <Button py="$2" px="$4" action="secondary" onPress={() => {}}>
                <ButtonText size="sm">Okay</ButtonText>
                <ButtonIcon as={CheckCircleIcon} ml="$2"/>
              </Button>
              <Button py="$2" px="$4" ml="$2" onPress={() => {}}>
                <ButtonText size="sm">Feedback</ButtonText>
                <ButtonIcon as={ReplyIcon} ml="$2"/>
              </Button>
            </HStack>
          </Card>
        </Box>
      );
  }
};
