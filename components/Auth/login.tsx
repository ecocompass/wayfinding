import { FormControl, VStack, Heading, Input, InputField, InputSlot, InputIcon, EyeIcon, EyeOffIcon, ButtonText } from "@gluestack-ui/themed";
import { useState } from "react";
import { Button, Text } from "react-native";

const Auth = ({ navigation }: any) => {
    const [showPassword, setShowPassword] = useState(false);
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
                type="text"
              />
            </Input>
          </VStack>
          <VStack space='xs'>
            <Text>
              Password
            </Text>
            <Input>
              <InputField
                type={showPassword ? 'text' : 'password'}
              />
              <InputSlot pr='$3' onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}  color='$darkBlue500'/>
              </InputSlot>
            </Input>
          </VStack>
          <Button title="Login" 
            onPress={()=>{
             // setShowModal(false);
              navigation.navigate("Map");
            }}
          >
            
          </Button>
        </VStack>
      </FormControl>
    );
  }
export default Auth;
