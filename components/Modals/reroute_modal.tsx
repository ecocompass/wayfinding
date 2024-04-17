/* eslint-disable react/react-in-jsx-scope */
import {
  Modal,
  ModalBackdrop,
  ModalHeader,
  Heading,
  ModalBody,
  Text,
  ModalFooter,
  ButtonText,
  Button,
  ModalContent,
} from '@gluestack-ui/themed';
import { useDispatch, useSelector } from "react-redux";
import {
  ToggleRerouteModal
} from '../../store/actions/modal';

const RerouteModal = (props: any) => {
  const dispatch = useDispatch();

  let showModal = useSelector((state: any) => {
    return state.modal.rerouteModal.visibility;
  });


  return (
    <Modal
      isOpen={showModal}
      onClose={() => { }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Lost?</Heading>
        </ModalHeader>
        <ModalBody>
          <Text>You seem to have gone off path.</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="negative"
            mr="$3"
            onPress={() => {
              props.onShowIntent(false);
              dispatch(ToggleRerouteModal({ visibility: false }));
            }}
          >
            <ButtonText>Exit Navigation</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {
              props.onShowIntent(true);
              dispatch(ToggleRerouteModal({ visibility: false }));
            }}
          >
            <ButtonText>Re-Route</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RerouteModal;