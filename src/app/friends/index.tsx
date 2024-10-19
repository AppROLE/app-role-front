import Background from "@/src/components/background";
import { Text, TouchableOpacity, View, FlatList, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import FriendCard from "@/src/components/friendCard";
import Svg from "@/src/components/svg";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { UserContext } from "@/context/user_context";

export default function Favorites() {
    const [search, setSearch] = useState('');
    const [filteredFriends, setFilteredFriends] = useState<{ username: string; profilePhoto: string; nickname: string; }[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Pesquise por nome e apelido...');
    const { findPerson } = useContext(UserContext);
    const navigation = useRouter();

    let timeoutInputFindPerson: NodeJS.Timeout | null = null;

    useEffect(() => {
        // Limpa o timeout anterior, se houver
        if (timeoutInputFindPerson) {
            clearTimeout(timeoutInputFindPerson);
        }

        // Define um novo timeout para o debounce
        timeoutInputFindPerson = setTimeout(async () => {
            if (search === '') {
                setFilteredFriends([]);
                setMessage('Pesquise por nome e apelido...');
                return;
            }

            setLoading(true); // Inicia o carregamento
            try {
                const response = await findPerson(search);
                if (response && response.users && response.users.length > 0) {
                    setFilteredFriends(response.users);
                    setMessage('');
                } else {
                    setFilteredFriends([]);
                    setMessage(response?.message || 'Nenhum usuário encontrado!');
                }
            } catch (error: any) {
                // Lidar com erros de rede
                console.log('Erro ao buscar usuários:', error);
                if (error.response) {
                    setMessage('Erro ao buscar usuários: ' + (error.response.data.message || 'Erro desconhecido.'));
                } else if (error.request) {
                    setMessage('Erro de rede: Não foi possível conectar ao servidor.');
                } else {
                    setMessage('Erro: ' + error.message);
                }
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        }, 800); 

        // Limpa o timeout quando o componente for desmontado
        return () => {
            if (timeoutInputFindPerson) {
                clearTimeout(timeoutInputFindPerson);
            }
        };
    }, [search]);

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
                    {loading ? (
                        <></>
                    ) : filteredFriends.length === 0 ? (
                        <View className="justify-center items-center pb-20">
                            <Text className="text-[#DFA9FD] text-xl">{message}</Text>
                        </View>
                    ) : (
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
                            ListEmptyComponent={
                                search === '' ? null : <Text className="text-white text-center mt-20">Nenhum amigo encontrado!</Text>
                            }
                        />
                    )}
                </View>
            </View>
        </Background>
    );
}
