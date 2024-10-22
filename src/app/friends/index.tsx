import Background from "@/src/components/background";
import { Text, TouchableOpacity, View, FlatList, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import FriendCard from "@/src/components/friendCard";
import Svg from "@/src/components/svg";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { UserContext } from "@/context/user_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RoleMainButton from "@/src/components/roleMainButton";

export default function Favorites() {
    const [search, setSearch] = useState('');
    const [filteredFriends, setFilteredFriends] = useState<{ username: string; profilePhoto: string; nickname: string; }[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Pesquise por usuário e apelido...');
    const [recentSearches, setRecentSearches] = useState<{ username: string; profilePhoto: string; nickname: string; }[]>([]);
    const { findPerson } = useContext(UserContext);
    const navigation = useRouter();

    let timeoutInputFindPerson: NodeJS.Timeout | null = null;

    useEffect(() => {
        if (timeoutInputFindPerson) {
            clearTimeout(timeoutInputFindPerson);
        }

        timeoutInputFindPerson = setTimeout(async () => {
            if (search === '') {
                setFilteredFriends([]);
                setMessage('Pesquise por usuário e apelido...');
                return; 
            }

            setLoading(true);
            try {
                const response = await findPerson(search);
                if (response && response.users && response.users.length > 0) {
                    setFilteredFriends(response.users);
                    setMessage('');
                    saveRecentSearch(response.users[0]);
                } else {
                    setFilteredFriends([]);
                    setMessage(response?.message || 'Nenhum usuário encontrado!');
                }
            } catch (error: any) {
                console.log('Erro ao buscar usuários:', error);
                if (error.response) {
                    setMessage('Erro ao buscar usuários: ' + (error.response.data.message || 'Erro desconhecido.'));
                } else if (error.request) {
                    setMessage('Erro de rede: Não foi possível conectar ao servidor.');
                } else {
                    setMessage('Erro: ' + error.message);
                }
            } finally {
                setLoading(false);
            }
        }, 800);

        return () => {
            if (timeoutInputFindPerson) {
                clearTimeout(timeoutInputFindPerson);
            }
        };
    }, [search]);

    const saveRecentSearch = async (profile: { username: string; profilePhoto: string; nickname: string; }) => {
        try {
            const storedSearches = await AsyncStorage.getItem('recentSearches');
            let searches = storedSearches ? JSON.parse(storedSearches) : [];

            searches = [profile, ...searches.filter((item: any) => item.username !== profile.username)];

            if (searches.length > 5) {
                searches = searches.slice(0, 5);
            }

            await AsyncStorage.setItem('recentSearches', JSON.stringify(searches));
            setRecentSearches(searches);
        } catch (error) {
            console.error('Erro ao salvar o histórico de pesquisas:', error);
        }
    };

    const loadRecentSearches = async () => {
        try {
            const storedSearches = await AsyncStorage.getItem('recentSearches');
            if (storedSearches) {
                setRecentSearches(JSON.parse(storedSearches));
            }
        } catch (error) {
            console.error('Erro ao carregar o histórico de pesquisas:', error);
        }
    };

    const clearRecentSearches = async () => {
        try {
            await AsyncStorage.removeItem('recentSearches');
            setRecentSearches([]);
        } catch (error) {
            console.error('Erro ao limpar o histórico de pesquisas:', error);
        }
    };

    useEffect(() => {
        loadRecentSearches();
    }, []);

    function handleVoltar() {
        navigation.back();
    }

    return (
        <Background>
            <View className="items-start h-full w-full">
                <View className="absolute top-0 flex h-12 w-full flex-row items-center gap-3 border-b-2 border-b-[#2C2B2B] pb-8">
                    <TouchableOpacity
                        onPress={() => handleVoltar()}
                        className="ml-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
                    >
                        <Svg
                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/left_arrow.svg'}
                            width={20}
                            height={20}
                        />
                    </TouchableOpacity>
                    <View className="flex h-12 w-[76%] flex-row items-center gap-2 rounded-full bg-[#1C1C1C] pl-3">
                        <FontAwesome6 name="magnifying-glass" size={20} color="#BDBDBD" />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Encontre os seus amigos!"
                            placeholderTextColor="#BDBDBD"
                            className="w-[90%] text-xl text-white outline-none"
                        />
                    </View>
                </View>
                <View className="p-10 mt-8 w-full">
                    {search === '' && recentSearches.length > 0 && (
                        <View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-white text-2xl mb-4 font-bold">Últimas pesquisas</Text>
                                <View className="mb-4">
                                    <RoleMainButton type={'gradient'} buttonFunction={clearRecentSearches}>
                                        <Text className="text-white font-bold">Limpar</Text>
                                    </RoleMainButton>
                                </View>
                            </View>
                            {recentSearches.map((item) => (
                                <FriendCard
                                    key={item.username}
                                    image={item.profilePhoto}
                                    nickname={item.nickname}
                                    user={item.username}
                                />
                            ))}
                        </View>
                    )}

                    {search === '' && recentSearches.length === 0 && (
                        <View className="justify-center items-center pb-20">
                            <Text className="text-[#DFA9FD] text-xl">Pesquise por usuário e apelido...</Text>
                        </View>
                    )}

                    {search !== '' && filteredFriends.length > 0 ? (
                        <FlatList
                            data={filteredFriends}
                            keyExtractor={(item) => item.username}
                            renderItem={({ item }) => (
                                <FriendCard
                                    image={item.profilePhoto}
                                    nickname={item.nickname}
                                    user={item.username}
                                />
                            )}
                        />
                    ) : search !== '' && (
                        <View className="justify-center items-center pb-20">
                            <Text className="text-[#DFA9FD] text-xl">{message}</Text>
                        </View>
                    )}
                </View>
            </View>
        </Background>
    );
}
