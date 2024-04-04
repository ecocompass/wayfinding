/* eslint-disable react-native/no-inline-styles */
import {
  VStack,
  Heading,
  FormControl,
  Button,
  ButtonText,
  HStack,
  Box,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Icon,
  ModalHeader,
  CloseIcon,
  ModalBackdrop,
  Center,
  Text
} from '@gluestack-ui/themed';

import React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { prefAction } from '../../store/actions/user';
import { BadgeInfo } from 'lucide-react-native';

const Preference = ({ navigation }: any) => {
  const [allPreferences, setPreferences] = useState([
    { name: "Biking", isSelected: false },
    { name: 'Walking', isSelected: false },
    { name: 'Public Transport', isSelected: false },
    { name: 'Driving', isSelected: false },
  ]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);
  const togglePreference = (p) => {
    let newPreferences = allPreferences.map((ap) => {
      if (ap.name === p.name) {
        ap.isSelected = !ap.isSelected;
      }
      else {
        ap.isSelected = false;
      }
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
          <HStack>
          <Heading size="2xl">Set Your Preferences</Heading>
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
                <Heading size="lg">Setting your Preference</Heading>
                <ModalCloseButton>
                  <Icon as={CloseIcon} />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <Text>
                  Setting your preferred mode of transport will reflect in your route options.
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Center>
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
                    <Text color={p.isSelected ? 'white' : '$primary500'}>
                      {p.name}
                    </Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </HStack>
          <Button
            onPress={() => {
              dispatch(
                prefAction({
                  public_transport: allPreferences.find(
                    (x) => x.name === 'Public Transport'
                  )?.isSelected
                    ? '0'
                    : '1',
                  bike_weight: allPreferences.find((x) => x.name === 'Biking')
                    ?.isSelected
                    ? '0'
                    : '1',
                  walking_weight: allPreferences.find(
                    (x) => x.name === 'Walking'
                  )?.isSelected
                    ? '0'
                    : '1',
                  driving_weight: allPreferences.find(
                    (x) => x.name === 'Driving'
                  )?.isSelected
                    ? '0'
                    : '1',
                })
              );
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
