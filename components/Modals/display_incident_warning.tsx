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
    VStack
  } from '@gluestack-ui/themed';
  import { useDispatch, useSelector } from "react-redux";
  import { ToggleIncidentModal, ToggleWarning } from '../../store/actions/modal';
  import { useEffect, useState } from 'react';
  import { reportIncidentAPI } from '../../store/actions/setLocation';
  
  const DisplayWarningModal = (props) => {

    const dispatch = useDispatch();
  
    let showModal = useSelector((state: any) => {
      return state.modal.displayWarning.visibility;
    });

    let warningData = useSelector((state: any) => {
        return state.modal.displayWarning.data
    })

  
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
            dispatch(ToggleWarning({ visibility: false }));
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Alert!</Heading>
          </ModalHeader>
          <ModalBody>
            <VStack>
                <Text>
                    {warningData? warningData.description : ''}
                </Text>
                <Text>
                    {warningData && warningData.roadClosed ? 'Road Closure ahead!' : ''}
                </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                dispatch(ToggleWarning({ visibility: false }));
              }}
            >
              <ButtonText>Proceed with caution</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                // reroute and hide modal
                props.onShowIntent(true);
                dispatch(ToggleWarning({ visibility: false }));
              }}
            >
              <ButtonText>Reroute</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default DisplayWarningModal;
  