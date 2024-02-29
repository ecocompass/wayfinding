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

const Preference = ({ navigation }: any) => {
  const [allPreferences, setPreferences] = useState([
    { name: "Biking", isSelected: false },
    { name: 'Walking', isSelected: false },
    { name: 'Public Transport', isSelected: false },
    {name: 'Driving', isSelected: false}
  ]);


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
        <VStack space="l">
          <Heading size="2xl">Set Your Preferences</Heading>
          <HStack space="xl" rounded="$md" my="$5" style={{flexWrap: 'wrap'}}>
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
                navigation.navigate('Map');
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
