import { VStack, ToastTitle, ToastDescription } from "@gluestack-ui/themed";
import { Toast } from '@gluestack-ui/themed';
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '75%',
    position: 'absolute',
    top: 5,
    left: 75,
    zIndex: 100,
  },
});

const ToastComponent = () => {
  const message = useSelector((state: any) => {
    return state.toast.toastMessage;
  });

  const show = useSelector((state: any) => {
    return state.toast.show;
  });

  const type = useSelector((state: any) => {
    return state.toast.type;
  });

  return (
    show && (
      <Toast style={styles.container} action={type} variant="accent">
        <VStack space="xs">
          <ToastDescription>{message}</ToastDescription>
        </VStack>
      </Toast>
    )
  );
};

export default ToastComponent;
