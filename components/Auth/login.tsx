import {
  FormControl,
  VStack,
  Heading,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  EyeIcon,
  EyeOffIcon,
  ButtonText,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { Button, Text } from "react-native";
import { loginAction } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import React from "react";

const Auth = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event);
    setIsEmailValid(validateEmail(event));
  };

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  return (
    <FormControl
      p="$4"
      borderWidth="$1"
      borderRadius="$lg"
      borderColor="$borderLight300"
      $dark-borderWidth="$1"
      $dark-borderRadius="$lg"
      $dark-borderColor="$borderDark800"
    >
      <VStack space="xl">
        <Heading>Welcome</Heading>
        <VStack space="xs">
          <Text>Email</Text>
          <Input>
            <InputField
              type="text"
              value={email}
              onChangeText={handleEmailChange}
            />
          </Input>
          {!isEmailValid && <Text style={{ color: 'red' }}>Invalid Email</Text>}
        </VStack>
        <VStack space="xs">
          <Text>Password</Text>
          <Input>
            <InputField
              id="password"
              testID="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChangeText={(event: any) => {
                setPassword(event);
              }}
            />
            <InputSlot pr="$3" onPress={handleState}>
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$darkBlue500"
              />
            </InputSlot>
          </Input>
        </VStack>
        <Button
          title="Login"
          testID="Login"
          onPress={() => {
            dispatch(loginAction({ email: email, password: password }));
          }}
        />
      </VStack>
    </FormControl>
  );
};
export default Auth;
