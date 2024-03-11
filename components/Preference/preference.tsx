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
} from '@gluestack-ui/themed';

import { Text } from "../ui/text";
import React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { prefAction } from '../../store/actions/setLocation';

const Preference = ({ navigation }: any) => {
  const [allPreferences, setPreferences] = useState([
    { name: "Biking", isSelected: false },
    { name: 'Walking', isSelected: false },
    { name: 'Public Transport', isSelected: false },
    { name: 'Driving', isSelected: false }
  ]);
  const dispatch = useDispatch();

  const togglePreference = (p) => {
    let newPreferences = allPreferences.map((ap) => {
      if (ap.name === p.name) {
        ap.isSelected = !ap.isSelected;
      };
      return ap;
    });

    setPreferences(newPreferences);
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
        <VStack space="xl">
          <Heading size="2xl">Set Your Preferences</Heading>
          <HStack space="xl" rounded="$md" my="$5" style={{ flexWrap: 'wrap' }}>
            {allPreferences.map((p) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    togglePreference(p);
                  }}
                  key={p.name}
                >
                  <Box
                    bg={p.isSelected ? '$primary500' : "white"}
                    p="$3"
                    borderColor={p.isSelected ? "" : '$primary500'}
                    rounded="$md"
                  >
                    <Text color={p.isSelected ? 'white' : "$primary500"}>{p.name}</Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </HStack>
          <Button
            onPress={() => {
              dispatch(prefAction({
                public_transport: (allPreferences.find((x) => x.name === 'Public Transport')?.isSelected)?"0":"1",
                bike_weight: (allPreferences.find((x) => x.name === 'Biking')?.isSelected)?"0":"1",
                walking_weight: (allPreferences.find((x) => x.name === 'Walking')?.isSelected)?"0":"1",
                driving_weight: (allPreferences.find((x) => x.name === 'Driving')?.isSelected)?"0":"1",
              }));
             // navigation.navigate('Map');
            }}
          >
            <ButtonText color="$white">Submit</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </View>
  );
};
export default Preference;
