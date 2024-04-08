import {
  Input,
  VStack,
  Heading,
  Text,
  InputField,
  FormControl,
  Button,
  ButtonText,
  Card,
  HStack,
  FormControlHelper,
  FormControlHelperText,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlError,
  AlertCircleIcon,
  Icon,
  Center,
} from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getToken, registerAction } from '../../store/actions/auth';
import { hideToast, showToast } from '../../store/actions/setLocation';
import NetInfo from '@react-native-community/netinfo';
const Signup = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = React.useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
    React.useState(false);
  const handlePasswordChange = (event: any) => {
    setPassword(event);
    setIsPasswordInvalid(event.length < 8); // Check password length on change
  };
  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event);
    setIsConfirmPasswordInvalid(password !== event); // Check password match
  };

  //const netInfo = useNetInfo();
  const [connectionStatus, setConnectionStatus] = useState(false);
  const CheckConnectivity = () => {
    // const netInfo=useNetInfo()
    NetInfo.addEventListener((state: any) => {
      setConnectionStatus(state.isConnected);
    });
  };
  useEffect(() => {
    CheckConnectivity();
    dispatch(getToken());
  }, []);
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {connectionStatus ? (
        <FormControl p="$4">
          <VStack space="xl">
            <Heading size="5xl">Hello!</Heading>
            <VStack space="sm">
              <Text lineHeight="$xs">Name</Text>
              <Input>
                <InputField
                  type="text"
                  value={username}
                  onChangeText={(event: any) => {
                    setUsername(event);
                  }}
                />
              </Input>
              <Text lineHeight="$xs">Email</Text>
              <Input>
                <InputField
                  type="text"
                  value={email}
                  onChangeText={(event: any) => {
                    setEmail(event);
                  }}
                />
              </Input>
              <Text lineHeight="$xs">Password</Text>
              <Input isInvalid={isPasswordInvalid} isRequired={true}>
                <InputField
                  type="password"
                  value={password}
                  onChangeText={handlePasswordChange}
                />
              </Input>
              {isPasswordInvalid && (
                <FormControlHelper>
                  <FormControlHelperText>
                    Password must be at least 8 characters
                  </FormControlHelperText>
                </FormControlHelper>
              )}
              <Text lineHeight="$xs">Confirm Password</Text>
              <Input isInvalid={isConfirmPasswordInvalid} isRequired={true}>
                <InputField
                  type="password"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                />
              </Input>
              {isConfirmPasswordInvalid && (
                <FormControlHelper>
                  <Icon as={AlertCircleIcon} size="md" color="red" />
                  <FormControlHelperText color="red">
                    Passwords must match
                  </FormControlHelperText>
                </FormControlHelper>
              )}
            </VStack>
            <VStack>
              <Button
                onPress={() => {
                  if (!isPasswordInvalid && !isConfirmPasswordInvalid) {
                    dispatch(
                      registerAction({
                        email: email,
                        username: username,
                        password: password,
                      })
                    );
                  }
                }}
              >
                <ButtonText color="$white">Register</ButtonText>
              </Button>
              <Center h={50}>
                <Text>OR</Text>
              </Center>
              <Button
                onPress={() => {
                  navigation.navigate('Login', {});
                }}
              >
                <ButtonText color="$white">Login</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </FormControl>
      ) : (
        <Center h={50}>
          <Button
            size="md"
            onPress={() => {
              navigation.navigate('Map', {});
            }}
          >
            <ButtonText>Go Offline</ButtonText>
          </Button>
        </Center>
      )}
    </View>
  );
};

export default Signup;
