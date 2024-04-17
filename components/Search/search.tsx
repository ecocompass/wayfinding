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
  KeyboardAvoidingView,
} from '@gluestack-ui/themed';
import { useState, useCallback, useEffect } from 'react';
import {geoCodeApi} from '../../services/network.service'
import * as React from "react";
import { debounce } from 'lodash';
import { useSelector, useDispatch, UseSelector } from 'react-redux';
import { Platform, Touchable, TouchableOpacity } from 'react-native';
import { setCenter, setSearchStatus } from '../../store/actions/setLocation';

export const SearchBox = (props: any) => {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    let isSearching = useSelector((state: any) => {return state.location.isSearching;});
    let userLocation = useSelector((state: any) => {return state.location.userLocation;}); // Longitude, Latitude
    let centerLocation = useSelector((state: any) => {return state.location.centerLocation;});

    const dispatch = useDispatch();

    const fetchResult = async (searchTerm: string, proximity: any) => {
        if (searchTerm.length) {
            const response = await geoCodeApi(searchTerm, proximity.join(','));
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
    };

    const setCenterLocation = (destLocation: any) => {
        // dispatch(setCenter(destLocation.center));
        props.onLocationSelect(destLocation);
    };

    const debounced = useCallback(debounce(fetchResult, 500), []);
    return (
        <>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            m="$2"
            onTouchStart={() => dispatch(setSearchStatus(true))}
        >
            <InputSlot pl="$3">
                <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField 
                ml="$2"
                placeholder="Take me somewhere"
                onChangeText={(newText) => {setSearchText(newText); debounced(newText, userLocation, 1000);}}
                defaultValue={searchText}/>
            {searchText.length ? (
            <InputSlot pl="$3" onPress={() => {setSearchResult([]); setSearchText('');}}>
                <InputIcon as={CloseCircleIcon} />
            </InputSlot>
            ) : null}
        </Input>
        </KeyboardAvoidingView>
        <Box py="$3">
            <FlatList
                data={searchResult}
                renderItem={({ item }: any) => (
                    <TouchableOpacity onPress={()=> {setCenterLocation(item); setSearchResult([]); setSearchText('');}} >
                        <Box
                        borderBottomWidth="$1"
                        borderColor="$trueGray300"
                        $base-pl={0}
                        $base-pr={0}
                        $sm-pl="$4"
                        $sm-pr="$5"
                        py="$3"
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
                    </TouchableOpacity>
                )}
                keyExtractor={(item: any) => item.id} />
        </Box></>
    );
};
