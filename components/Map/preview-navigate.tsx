import { HStack, ScrollView, VStack, Text, Heading, Pressable } from "@gluestack-ui/themed";

export const PreviewNavigate = () => {
  const paths: any = [
    {
        mode: 'Walk',
    },{
        mode: 'Drive'
    }];

  return (
    <ScrollView>
      <VStack>
        <Pressable bg="$primary500">
          <HStack px="$4" py="$4">
            <Heading>Walk</Heading>
          </HStack>
        </Pressable>
        <Pressable>
          <HStack>
            <Heading>Drive</Heading>
          </HStack>
        </Pressable>
      </VStack>
    </ScrollView>
  );
};
