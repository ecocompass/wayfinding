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
    Divider,
    Progress,
    ProgressFilledTrack,
  } from '@gluestack-ui/themed';
  
  import { Text } from "../ui/text";
  import React, { useEffect, useState } from 'react';
  import { View } from 'react-native';
  import { useDispatch,useSelector } from 'react-redux';
  import { goalAction, prefAction, readGoalAction } from '../../store/actions/user';
  
  const ReadGoals = ({ navigation }: any) => {
    
    const [allGoals, setGoals] = useState([
      { name: 'Biking', value: 0 },
      { name: 'Walking', value: 0 },
      { name: 'Public Transport', value: 0 },
    ]);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(readGoalAction());
  },[])
   const userGoals = useSelector((state: any) => { return state.userDetails.goal})|| []
   //const userGoals:any=[];
    console.log("usergoals",userGoals)
    const updateGoalValue = (name: string, value: any) => {
      let newGoals= allGoals.map((goal) =>{
      if(goal.name === name) {
        goal.value=value
      }
  return goal;
    })
      setGoals(newGoals);
    };
  const transports:any =
    {public_transport:'Public Transport',
    cycling:'Cycling',
    walking:'Walking'
  }

    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: "center",
        }}
      ><VStack width={390} space="md" marginTop={"$10"} p="$4">
      <HStack space="lg" alignItems="center">
        <Text>Your Current Goals</Text> 
       { userGoals && userGoals.map((g)=>(
       /*  <Text>{transports[g.type]+":"+g.target}</Text> */

        <VStack space="lg">
        <Heading>{transports[g.type]}</Heading>
        <Progress value={g.target} w={410} h={8} bg="$lime100">
          <ProgressFilledTrack h={8} bg="$lime500" />
        </Progress>
        <Text size="md">{g.target +'km'}</Text>
        </VStack>
      
        ))}
          
      </HStack>
      <Divider></Divider>
      <HStack space="lg" alignItems="center">
          <Text>+353 213193212</Text>
      </HStack>
  </VStack>
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
  
  export default ReadGoals;
  