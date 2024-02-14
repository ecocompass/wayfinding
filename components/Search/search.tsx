/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
    Avatar,
    AvatarImage,
    Box,
    FlatList,
    HStack,
    Heading,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  Text,
  Textarea,
  TextareaInput,
  ChevronsRightIcon,
  VStack,
} from '@gluestack-ui/themed';

export const SearchBox = () => {
    const data = []
    return (
        <><Input
            variant="rounded"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            m="$2"
        >
            <InputSlot pl="$3">
                <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Take me somewhere" />
        </Input>
        <Box py="$3">
            <FlatList
                data={data}
                renderItem={({ item }: any) => (
                    <Box
                        borderBottomWidth="$1"
                        borderColor="$trueGray300"
                        $base-pl={0}
                        $base-pr={0}
                        $sm-pl="$4"
                        $sm-pr="$5"
                        py="$2"
                    >
                        <HStack space="md">
                            <Icon as={ChevronsRightIcon} size="lg" style={{alignSelf: "center"}} />
                            <VStack py="$2" px="$4">
                                <Text
                                    color="$coolGray800"
                                    $dark-color="$warmGray100"
                                >
                                    {item.fullName}
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                )}
                keyExtractor={(item: any) => item.id} />
        </Box></>
    );
};
