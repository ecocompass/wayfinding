import { VStack, ToastTitle, ToastDescription,} from "@gluestack-ui/themed";
import { Toast } from '@gluestack-ui/themed';
import { connect } from "react-redux";
import { StyleSheet } from "react-native";

const mapStateToProps = (state:any) => ({
  message: state.toast.toastMessage,
  show: state.toast.show,
});
const styles = StyleSheet.create({
    container: {
    width:'92%',
      position:"absolute", 
      top:25,
      zIndex:100

    },
  });

const ToastComponent = ({ message, show }) => {


  return (
    show && (

      <Toast style={styles.container} action="error" variant="accent">
        <VStack space="xs">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
        </VStack>
      </Toast>
    )
  );

};

export default connect(mapStateToProps)(ToastComponent);
