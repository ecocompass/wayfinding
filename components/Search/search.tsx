/* eslint-disable react-hooks/exhaustive-deps */
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
  CloseCircleIcon,
  VStack,
} from '@gluestack-ui/themed';
import { useState, useCallback } from 'react';
import {geoCodeApi} from '../../services/network.service'
import * as React from "react";
import { debounce } from 'lodash';

export const SearchBox = (props: any) => {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([])
    async function fetchResult(searchTerm: string) {
        if (searchTerm.length) {
            console.log(props.userLocation)
            const response = await geoCodeApi(searchTerm, props.userLocation.join(','));
            setSearchResult(response.features.map((feature: any) => {
                return {
                    id: feature.id,
                    properties: feature.properties,
                    center: feature.center,
                    name: feature.text,
                    address: feature.place_name,
                };
            }));
        } else {
            setSearchResult([]);
            setSearchText('');
        }
    }
    const debounced = useCallback(debounce(fetchResult, 500), []);
    return (
        <><Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            m="$2"
        >
            <InputSlot pl="$3">
                <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField 
                ml="$2" 
                placeholder="Take me somewhere" 
                onChangeText={(newText) => {setSearchText(newText); debounced(newText, 1000)}}
                defaultValue={searchText}/>
            {searchText.length ? (
            <InputSlot pl="$3" onPress={() => {setSearchResult([]); setSearchText('');}}>
                <InputIcon as={CloseCircleIcon} />
            </InputSlot>
            ) : null}
        </Input>
        <Box py="$3">
            <FlatList
                data={searchResult}
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
                                    {item.name}
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                )}
                keyExtractor={(item: any) => item.id} />
        </Box></>
    );
};
