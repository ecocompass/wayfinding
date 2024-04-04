import {
  Modal,
  ModalBackdrop,
  ModalHeader,
  ModalCloseButton,
  Heading,
  ModalBody,
  Text,
  ModalFooter,
  ButtonText,
  Button,
  ModalContent,
  Icon,
  CloseIcon,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import { useDispatch, useSelector } from "react-redux";
import { ToggleLocationModal } from '../../store/actions/modal';
import { useState } from 'react';
import { saveLocationAPI } from '../../store/actions/setLocation';

const SavedLocationModal = (props) => {
  const dispatch = useDispatch();

  let showModal = useSelector((state) => {
    return state.modal.savedLocationModal.visibility;
  });

  let locationData = useSelector((state) => {
    return state.modal.savedLocationModal.data;
  });

  let [tagName, setTagName] = useState('');

  const onLocationSave = () => {
    let data = {
      location_name: tagName,
      longitude: String(locationData.coordinates[0]),
      latitude: String(locationData.coordinates[1]),
    };
    dispatch(saveLocationAPI(data));
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        dispatch(ToggleLocationModal({ visibility: false }));
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Save {locationData?.name} ?</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            mt="$5"
          >
            <InputField
              placeholder="Name (example: Home/work)"
              onChangeText={(val) => {
                setTagName(val)
              }}
            />
          </Input>
          <Text size="xs" color="gray">
            {' '}
            Lat: {locationData?.coordinates[1]}; Lon:{' '}
            {locationData?.coordinates[0]}{' '}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              dispatch(ToggleLocationModal({ visibility: false }));
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {
              onLocationSave();
            }}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SavedLocationModal;
