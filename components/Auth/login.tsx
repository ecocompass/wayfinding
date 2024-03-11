/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { FormControl, VStack, Heading, Input, InputField, InputSlot, InputIcon, EyeIcon, EyeOffIcon, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { Button, Text } from "react-native";
import { loginAction } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import React from "react";

const Auth = ({ navigation }: any) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const dispatch=useDispatch();
    const handleState = () => {
      setShowPassword((showState) => {
        return !showState;
      });
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
        <VStack space='xl'>
          <Heading>
            Welcome
          </Heading>
          <VStack space='xs'>
            <Text>
              Email
            </Text>
            <Input>
              <InputField
                type="text" value={email}
                onChangeText={(event: any) => {
                  setEmail(event)
                }}
              />
            </Input>
          </VStack>
          <VStack space='xs'>
            <Text>
              Password
            </Text>
            <Input>
              <InputField
                type={showPassword ? 'text' : 'password'} value={password}
                onChangeText={(event: any) => {
                  setPassword(event);
                }}
              />
              <InputSlot pr='$3' onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}  color='$darkBlue500'/>
              </InputSlot>
            </Input>
          </VStack>
          <Button title="Login"
            onPress={()=>{
             // setShowModal(false);
            // navigation.navigate('Preference');
             dispatch(loginAction({ email: email, password: password}));
            }}
          >
          </Button>
        </VStack>
      </FormControl>
    );
  }
export default Auth;
