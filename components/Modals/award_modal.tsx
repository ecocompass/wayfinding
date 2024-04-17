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
  Image
} from '@gluestack-ui/themed';
import { useDispatch, useSelector } from "react-redux";
import { ToggleAwardModal } from '../../store/actions/modal';


const AwardModal = (props: any) => {
  const dispatch = useDispatch();

  let showModal = useSelector((state: any) => {
    return state.modal.awardModal.visibility;
  });

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        dispatch(ToggleAwardModal({ visibility: false }));
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">You got an Award!</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Image alt="weather"
            size="md"
            source={{
              uri: `${props.award.awards}@2x.png`,
            }} />
          <Text>{props.award.awards}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              dispatch(ToggleAwardModal({ visibility: false }));
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={() => {
              dispatch(ToggleAwardModal({ visibility: false }));
            }}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AwardModal;
