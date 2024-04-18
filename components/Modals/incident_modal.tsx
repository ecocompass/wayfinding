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
  Textarea,
  Checkbox,
  CheckIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  TextareaInput,
  HStack,
} from '@gluestack-ui/themed';
import { useDispatch, useSelector } from "react-redux";
import { ToggleIncidentModal } from '../../store/actions/modal';
import { useEffect, useState } from 'react';
import { reportIncidentAPI } from '../../store/actions/setLocation';

const IncidentModal = (props: any) => {
  const currentUserLocation = props.currentUserLocation;
  const dispatch = useDispatch();

  const [description, setDescription] = useState<any>('');
  const [isRoadClosure, setIsRoadClosure] = useState<any>(false);
  const [isJamcident, setIsJamcident] = useState<any>(false);


  let showModal = useSelector((state: any) => {
    return state.modal.incidentModal.visibility;
  });

  const onReportIncident = () => {
    let data = {
      description,
      isJamcident,
      roadClosed: isRoadClosure,
      coordinates: [currentUserLocation[1], currentUserLocation[0]]
    };

    dispatch(reportIncidentAPI(data));
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        dispatch(ToggleIncidentModal({ visibility: false }));
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Report an Accident?</Heading>
        </ModalHeader>
        <ModalBody>
          <Text>
            Let us know if there is a road closure/accident near you! We will
            factor this in, for the safety of other users
          </Text>
          <Checkbox
            size="md"
            isInvalid={false}
            isDisabled={false}
            aria-label="check-1"
            onChange={(value) => {
              setIsJamcident(value);
            }}
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Small Accident?</CheckboxLabel>
          </Checkbox>
          <Checkbox
            size="md"
            isInvalid={false}
            isDisabled={false}
            aria-label="check-2"
            onChange={(value) => {
              setIsRoadClosure(value);
            }}
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Road Closed?</CheckboxLabel>
          </Checkbox>
          <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            mt="$2"
            w="$64"
          >
            <TextareaInput
              placeholder="Describe More..."
              onChangeText={(text) => {setDescription(text)}}
            />
          </Textarea>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              dispatch(ToggleIncidentModal({ visibility: false }));
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {
              // call incident modal
              onReportIncident();
            }}
          >
            <ButtonText>Report</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default IncidentModal;
