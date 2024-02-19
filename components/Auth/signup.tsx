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
import { register } from '../../store/actions/auth';


const Signup = ({ navigation }: any) => {
  let signup = useSelector((state: any) => {return state.register;});
  const dispatch=useDispatch();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email,setEmail] = React.useState('');
  const Register=()=>{
    dispatch(register({
      username:username,
      email:email,
      password:password,
    }))
  }
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
                onChange={(event:any) => {
                  setUsername(event.target.value);
                }} />
              </Input>
              <Text color="$text500" lineHeight="$xs">
                Email
              </Text>
              <Input
             >
               <InputField type='text'
               value={email}
               onChange={(event:any)=>{
                setEmail(event.target.value)
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
              onChange={(event:any) => {
                setPassword(event.target.value);
              }}/>
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
                  Register;
                  console.log('Signup',signup);
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
