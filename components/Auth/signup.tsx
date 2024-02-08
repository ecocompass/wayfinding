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
import { View } from 'react-native';

const Signup = ({ navigation }: any) => {
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
                <InputField type="text" />
              </Input>
              <Text color="$text500" lineHeight="$xs">
                Email
              </Text>
              <Input>
                <InputField type="text" />
              </Input>
              <Text color="$text500" lineHeight="$xs">
                Password
              </Text>
              <Input>
                <InputField type="password" />
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
                  console.log('Signup');
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
