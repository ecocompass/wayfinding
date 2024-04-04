import React, { useState, useEffect } from 'react';
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
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getToken, registerAction } from '../../store/actions/auth';
const Signup = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = React.useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = React.useState(false);
  const handlePasswordChange = (event: any) => {
    setPassword(event);
    setIsPasswordInvalid(event.length < 8); // Check password length on change
  };
  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event);
    setIsConfirmPasswordInvalid(password !== event); // Check password match
  };
  useEffect(() => {
    dispatch(getToken());
  },[]);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event);
    setIsEmailValid(validateEmail(event));
  };
  return (
    <View style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
      <FormControl p="$4">
        <VStack space="xl">
          <Heading size="5xl">Hello!</Heading>
          <VStack space="sm">
            {/* Other input fields */}
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
                onChangeText={handleEmailChange}
              />
            </Input>
            {!isEmailValid && <FormControlHelper>
                <Icon as={AlertCircleIcon} size="md" color='red' />
                <FormControlHelperText color='red'> Invalid Email </FormControlHelperText>
              </FormControlHelper>
               }
            {/* Other input fields */}
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
                <FormControlHelperText>Password must be at least 8 characters</FormControlHelperText>
              </FormControlHelper>
            )}
            <Text lineHeight="$xs">Confirm Password</Text>
            <Input isInvalid={isConfirmPasswordInvalid} isRequired={true}>
              <InputField type="password"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange} />
            </Input>
            {isConfirmPasswordInvalid && (
              <FormControlHelper>
                <Icon as={AlertCircleIcon} size="md" color='red' />
                <FormControlHelperText color='red'>Passwords must match</FormControlHelperText>
              </FormControlHelper>
            )}
          </VStack>
          <VStack>
            <Button
              onPress={() => {
                  if (!isPasswordInvalid && !isConfirmPasswordInvalid &isEmailValid) {
                  dispatch(
                      registerAction({
                        email: email,
                        username: username,
                        password: password,
                      })
                    );
              }
                
              }}
            disabled={!isEmailValid}
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
    </View>
  );
};

export default Signup;
