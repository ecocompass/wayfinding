import {
  Modal,
  ModalBackdrop,
  ModalHeader,
  ModalCloseButton,
  Heading,
  ModalBody,
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
import {
  ToggleFeedbackModal
} from '../../store/actions/modal';
import { useState } from 'react';
import { setFeedback } from '../../store/actions/setLocation';

const FeedbackModal = (props: any) => {
  const dispatch = useDispatch();

  let showModal = useSelector((state: any) => {
    return state.modal.feedbackModal.visibility;
  });

  let [tagName, setTagName] = useState('');

  const onFeedbackSave = () => {
    let data = {
      trip_id: props.trip_id,
      message: tagName,
    };
    dispatch(setFeedback(data));
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        dispatch(ToggleFeedbackModal({ visibility: false }));
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">How was your trip?</Heading>
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
              placeholder=""
              onChangeText={(val) => {
                setTagName(val);
              }}
            />
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              dispatch(ToggleFeedbackModal({ visibility: false }));
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {
              onFeedbackSave();
              dispatch(ToggleFeedbackModal({ visibility: false }));
            }}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
