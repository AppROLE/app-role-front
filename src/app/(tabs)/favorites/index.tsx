import Background from "@/src/components/background";
import {Text, TouchableOpacity, View, FlatList, Dimensions} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SocialCard from "@/src/components/socialCard";
import Svg from "@/src/components/svg";

import { router } from 'expo-router'
import { InstituteContext } from "@/context/institute_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllFavoritesInstitutesResponseDTO, Institute } from "@/api/types/institute_dto";


export default function Favorites() {
    const { width } = Dimensions.get('window')
    const { getAllFavoritesInstitutes } = useContext(InstituteContext)
    const [institutes, setInstitutes] = useState<getAllFavoritesInstitutesResponseDTO>()

    function navigateToFriends() {
        router.navigate('/friends')
    }

    function navigateToNotifications() {
        router.navigate('/notifications')
    }

    async function getAll() {
        try {
            const response = await getAllFavoritesInstitutes();
            if (response) {
                console.log('RESPOSTA DA GET ALL', response) 
                setInstitutes(response)
            }
            if (response.institutes.length === 0) { 
                setInstitutes({message: 'Nenhuma instituição favorita encontrada', institutes: []})
            }
            return response
        } catch (error: any) {
            return error
        }
    }

    useEffect(() => { 
        getAll();
    }, []);

    return (
        <Background>
            <View className="items-start h-full w-full">
                <View className='flex-row justify-between w-full px-8'>
                    <Text className="text-3xl text-white font-nunitoBold">Social</Text>
                    <View className='flex-row items-center gap-4'>
                        <TouchableOpacity
                            className='flex flex-row border-2 border-white rounded-lg bg-transparent gap-2'
                            style={{
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={navigateToFriends}
                        >
                            <Text className='text-white font-nunitoBold text-sm'>Adicione um amigo!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="relative" onPress={navigateToNotifications}>
                            <Svg
                                uri={process.env.EXPO_PUBLIC_URL_S3 + '/bell.svg'}
                                width={width / 17.8}
                                height={width / 14.7}
                            />
                            {/*Notificação*/}
                            <View className="absolute right-[-4] rounded-full w-4 h-4 bg-red-600 items-center justify-center">
                                <Text className=" text-white text-center" style={{fontSize: 10, lineHeight: 12}}>9+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="border-t-line_gray border-t-2 mt-8 p-10 w-full">
                    <Text className="text-2xl font-nunitoBold text-white mb-3">Instituições Favoritas</Text>
                    <FlatList
                        data={institutes?.institutes}
                        keyExtractor={(institute) => institute.instituteId}
                        renderItem={
                            ({ item: institute }) => <SocialCard title={institute.name} image={institute.logoPhoto}/>
                        }
                    />
                </View>
            </View>
        </Background>
    );
}