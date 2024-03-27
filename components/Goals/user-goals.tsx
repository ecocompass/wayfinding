/* eslint-disable react-native/no-inline-styles */
import {
  Input,
  VStack,
  Heading,
  InputField,
  FormControl,
  Button,
  ButtonText,
  Card,
  HStack,
  Box,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Center,
  Tooltip,
  TooltipContent,
} from '@gluestack-ui/themed';

import { Text } from "../ui/text";
import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { goalAction, prefAction } from '../../store/actions/user';

const Goals = ({ navigation }: any) => {
  const [allGoals, setGoals] = useState([
    { name: 'Biking', value: 0 },
    { name: 'Walking', value: 0 },
    { name: 'Public Transport', value: 0 },
  ]);
  const dispatch = useDispatch();

  const updateGoalValue = (name: string, value: any) => {
    let newGoals= allGoals.map((goal) =>{
    if(goal.name === name) {
      goal.value=value
    }
return goal;
  })
    setGoals(newGoals);
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
      }}
    >
      <FormControl p="$4">
       <VStack space='4xl'>
          <Heading size="2xl">Set Your Weekly Goals</Heading>
          <VStack space="4xl" rounded="$md" my="$5" ml="$20" style={{ flexWrap: 'wrap' }}>
            {allGoals.map((goal) => (
            
              <Center w="$48" key={goal.name}>
                <Text size='lg' textAlign='left'>{goal.name}</Text>
                <Text>{goal.value +'km'}</Text>
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
                  <SliderThumb bg="$cyan600" $active-outlineColor="$cyan500"/>
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

export default Goals;
