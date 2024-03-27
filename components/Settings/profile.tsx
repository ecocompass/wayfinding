import { Avatar, AvatarFallbackText, Box, Center, Divider, HStack, Icon, MailIcon, Text, VStack, EyeIcon, PhoneIcon, EyeOffIcon, Button, ButtonIcon } from "@gluestack-ui/themed";
import { RefreshCw, View } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../store/actions/user";

const Profile = () => {
    const dispatch = useDispatch()
useEffect(()=>{
    dispatch(profileAction());
},[])
    

    const [passwordVisible, setPasswordVisible] = useState(false);
    const profile = useSelector((state: any) => { return state.userDetails.profile})
    const username=`${profile.first_name} ${profile.last_name}`;
    const styles = StyleSheet.create({
        page: {

            top: '4%',
        },

    });
    return (
        <View style={styles.page}>
            <Center bg="$primary500" h={300} w={390} borderBottomRightRadius={200} borderBottomLeftRadius={200}>
                <Text size="4xl" color="$white" bold={true}>{username}</Text>
                <Avatar bgColor='$primary600' size="2xl" borderRadius="$full" bottom={-50} position="absolute">
                    <AvatarFallbackText>{username}</AvatarFallbackText>
                </Avatar>
            </Center>
            <VStack width={390} space="md" marginTop={"$10"} p="$4">
                <HStack space="lg" alignItems="center">
                    <Icon as={MailIcon} size="lg" />
                    <Text>{profile.email}</Text>
                </HStack>
                <Divider></Divider>
                <HStack space="lg" alignItems="center">
                    <Icon as={PhoneIcon} size="xl" />
                    <Text>+353 213193212</Text>
                </HStack>
            </VStack>
        </View>

    )
}

export default Profile;