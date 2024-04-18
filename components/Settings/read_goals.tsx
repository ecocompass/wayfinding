import {
  VStack,
  Heading,
  FormControl,
  Button,
  ButtonText,
  HStack,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Center,
  Progress,
  ProgressFilledTrack,
  Text,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Icon,
  ModalHeader,
  CloseIcon,
  ModalBackdrop,
} from '@gluestack-ui/themed';

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { goalAction, readGoalAction } from '../../store/actions/user';
import { BadgeInfo } from 'lucide-react-native';

const ReadGoals = ({ navigation }: any) => {

  const [allGoals, setGoals] = useState([
    { name: 'Biking', value: 0 },
    { name: 'Walking', value: 0 },
    { name: 'Public Transport', value: 0 },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readGoalAction());
  }, [])
  const userGoals = useSelector((state: any) => { return state.userDetails.goal })
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);
  const updateGoalValue = (name: string, value: any) => {
    let newGoals = allGoals.map((goal) => {
      if (goal.name === name) {
        goal.value = value
      }
      return goal;
    })
    setGoals(newGoals);
  };
  const transports: any =
  {
    public_transport: 'Public Transport',
    cycling: 'Biking',
    walking: 'Walking'
  }
  const current: any = {
    public_transport: 30,
    cycling: 0,
    walking: 0
  }

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
      }}
    ><VStack width={390} space="sm" marginTop={"$10"} p="$4">
        <HStack alignItems='center' >
          <Heading>Your Current Goals</Heading>
          <BadgeInfo onPress={() => setShowModal(true)} />
        </HStack>
        <Center>
          <Modal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false)
            }}
            finalFocusRef={ref}
          >
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <Heading size="lg">Did you Know?</Heading>
                <ModalCloseButton>
                  <Icon as={CloseIcon} />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <Text>
                  Driving a medium gasoline-powered car for 100 kilometers can emit around 19.2 kilograms of CO2.
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Center>
        {userGoals && userGoals.map((g) => (

          <VStack space="lg" key={transports[g.type]}>
            <Heading>{transports[g.type]}</Heading>
            <HStack alignItems='center'>
              <Progress value={g.current * 100 / g.target} w={310} h={8} bg="$lime100">
                <ProgressFilledTrack h={8} bg="$lime500" />
              </Progress>
              <Text size="md" ml={'$2'}>{g.target + ' km'}</Text>
            </HStack>
          </VStack>

        ))}

      </VStack>
      <FormControl p="$4">
        <VStack space='2xl'>
          <Heading size="2xl">Reset Your Weekly Goals</Heading>
          <VStack space="lg" rounded="$md" my="$5" ml="$20" style={{ flexWrap: 'wrap' }}>
            {allGoals.map((goal) => (

              <Center w="$48" key={goal.name}>
                <Text size='lg' textAlign='left'>{goal.name}</Text>
                <Text>{goal.value + ' km'}</Text>
                <HStack space="4xl">
                  <Text size="md">0 km</Text>

                  <Slider
                    step={5}
                    sliderTrackHeight={5}
                    size="md"
                    value={goal.value}
                    minValue={0}
                    maxValue={100}
                    onChange={(value: any) => updateGoalValue(goal.name, Math.floor(value))}
                  >
                    <SliderTrack><SliderFilledTrack bg="$cyan600" /></SliderTrack>
                    <SliderThumb bg="$cyan600" $active-outlineColor="$cyan500" />
                  </Slider>
                  <Text size="md">100 km</Text>
                </HStack>
              </Center>
            ))}
          </VStack>
          <Button
            onPress={() => {
              dispatch(
                goalAction({
                  public_transport: allGoals.find(
                    (x) => x.name === 'Public Transport'
                  ).value,
                  bike_weight: allGoals.find((x) => x.name === 'Biking').value,
                  walking_weight: allGoals.find((x) => x.name === 'Walking')
                    .value
                })
              );
            }}
          >
            <ButtonText>Submit</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </View>
  );
};

export default ReadGoals;
