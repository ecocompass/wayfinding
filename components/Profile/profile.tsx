import { Avatar, AvatarFallbackText, Box, Center, Divider, HStack, Icon, MailIcon, Text, VStack, EyeIcon, PhoneIcon, EyeOffIcon, Button, ButtonIcon } from "@gluestack-ui/themed";
import { RefreshCw, View } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../store/actions/auth";

const Profile = () => {

    const dispatch = useDispatch()
    dispatch(profileAction());
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleIconPress = () => {
        console.log("PRessed")
        setPasswordVisible((state) => { return !state });
    };

    const passwordText = passwordVisible ? 'Show Password' : 'Password';
    const username = useSelector((state: any) => { return state.profile.username })
    const styles = StyleSheet.create({
        page: {

            top: '4%',
        },

    });
    return (
        <View style={styles.page}>
            <Center bg="$primary500" h={300} w={390} borderBottomRightRadius={200} borderBottomLeftRadius={200}>
                <Text>{username}</Text>
                <Avatar bgColor='$primary600' size="2xl" borderRadius="$full" bottom={-50} position="absolute">
                    <AvatarFallbackText>{username}</AvatarFallbackText>
                </Avatar>
            </Center>
            <VStack width={390} space="md" marginTop={"$10"} p="$4">
                <HStack space="lg" alignItems="center">
                    <Icon as={MailIcon} size="lg" />
                    <Text>agrawasa@tcd.ie</Text>
                </HStack>
                <Divider></Divider>
                <HStack space="lg" alignItems="center">
                    <Icon as={PhoneIcon} size="xl" />
                    <Text>+353 213193212</Text>
                </HStack>
                <Divider></Divider>
                <HStack space="lg" alignItems="center">
                    <Icon as={!passwordVisible ? EyeIcon : EyeOffIcon} size="xl" />
                    <Text color="grey" bold={true}>{passwordText}</Text>
                    <Button onPress={handleIconPress} variant="solid" isDisabled={false} size="md"><ButtonIcon as={RefreshCw} />
                    </Button>
                </HStack>
                <Divider></Divider>
            </VStack>
        </View>

    )
}

export default Profile;