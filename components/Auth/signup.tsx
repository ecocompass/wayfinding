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
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
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
          <Heading size='5xl' color="$text900" >
            Hello!
          </Heading>
          <VStack space="sm">
            <Text color="$text500" lineHeight="$xs">
              Name
            </Text>
            <Input>
              <InputField type="text"
                value={username}
                onChangeText={(event: any) => {
                  setUsername(event);
                }} />
            </Input>
            <Text color="$text500" lineHeight="$xs">
              Email
            </Text>
            <Input
            >
              <InputField type='text'
                value={email}
                onChangeText={(event: any) => {
                  setEmail(event)
                }}
              >

              </InputField>
            </Input>
            <Text color="$text500" lineHeight="$xs">
              Password
            </Text>
            <Input>
              <InputField type="password"
                value={password}
                onChangeText={(event: any) => {
                  setPassword(event);
                }} />
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
              dispatch(registerAction({ email: email, username: username, password: password }));
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
