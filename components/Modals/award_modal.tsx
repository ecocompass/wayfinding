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
  Image,
  Center,
} from '@gluestack-ui/themed';
import { useDispatch, useSelector } from "react-redux";
import { ToggleAwardModal } from '../../store/actions/modal';
import { walkAward } from '../../images';

const AwardModal = (props: any) => {
  const dispatch = useDispatch();

  let showModal = useSelector((state: any) => {
    return state.modal.awardModal.visibility;
  });

  let awardData = useSelector((state: any) => {
    return state.modal.awardModal.data;
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
          <Center>
            {(awardData && awardData.image) ? (
              <Image alt="award" size="2xl" source={walkAward} />
            ) : (
              <></>
            )}
          </Center>
          <Text>{awardData ? awardData.message : ""}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AwardModal;
