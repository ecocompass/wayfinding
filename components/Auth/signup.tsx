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
} from '@gluestack-ui/themed';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../store/actions/auth';

const Signup = ({ navigation }: any) => {
  let register = useSelector((state: any) => {
    return state.register;
  });
  let payt = useSelector((state: any) => {
    return state.data;
  });
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  /*   const Register=()=>{

    dispatch(registerAction({
      username:username,
      email:email,
      password:password,
    }))
  } */
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <FormControl p="$4">
        <VStack space="xl">
          <Heading size="5xl" color="$text900">
            Hello!
          </Heading>
          <VStack space="sm">
            <Text color="$text500" lineHeight="$xs">
              Name
            </Text>
            <Input>
              <InputField
                type="text"
                value={username}
                onChangeText={(event: any) => {
                  setUsername(event);
                }}
              />
            </Input>
            <Text color="$text500" lineHeight="$xs">
              Email
            </Text>
            <Input>
              <InputField
                type="text"
                value={email}
                onChangeText={(event: any) => {
                  console.log('Event', event);
                  setEmail(event);
                }}
              />
            </Input>
            <Text color="$text500" lineHeight="$xs">
              Password
            </Text>
            <Input>
              <InputField
                type="password"
                value={password}
                onChangeText={(event: any) => {
                  console.log("pass", password);
                  setPassword(event);
                }}
              />
            </Input>
            <Text color="$text500" lineHeight="$xs">
              Confirm Password
            </Text>
            <Input>
              <InputField type="password" />
            </Input>
          </VStack>
          <Button
            onPress={() => {
              dispatch(
                registerAction({
                  email: email,
                  username: username,
                  password: password,
                })
              );
              //  navigation.navigate('Map');
              console.log('Signup', register);
              console.log('payt', payt);
            }}
          >
            <ButtonText color="$white">Register</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </View>
  );
};
export default Signup;
