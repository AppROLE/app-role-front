import Background from '@/src/components/background'
import RoleInput from '@/src/components/input'
import RoleMainButton from '@/src/components/roleMainButton'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {useContext, useEffect, useState} from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput
} from 'react-native'
import { AuthContext } from '@/context/auth_context'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function EditingPerfil() {
  const navigation = useRouter()
  const [userErr, setUserErr] = useState('')
  const [nickErr, setNickErr] = useState('')
  const [bioErr, setBioErr] = useState('')
  const [instaErr, setInstaErr] = useState('')
  const [tiktokErr, setTiktokErr] = useState('')

  const [profileImage, setProfileImage] = useState(process.env.EXPO_PUBLIC_URL_S3 + '/images/profile_default.png')
  const [imageType, setImageType] = useState('')
  const [banner, setBanner] = useState('')
  const [bannerType, setBannerType] = useState('')
  const [user, setUser] = useState('')
  const [nick, setNick] = useState('')
  const [bio, setBio] = useState('')
  const [insta, setInsta] = useState('')
  const [tiktok, setTiktok] = useState('')

  const pickProfilePhoto = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log('RESPOSTA DO PICKER ' + result)

    if (!result.canceled) {
      const selectedImage = result.assets[0] // Obter o primeiro item na seleção
      const imageUri = selectedImage.uri
      const imageType = imageUri.split('.').pop()
      const formattedImageType = imageType ? `.${imageType}` : ''

      console.log('IMAGEM SELECIONADA ' + selectedImage.uri)
      console.log('TYPE IMAGE ', formattedImageType)

      setImageType(formattedImageType) // Definir a imagem localmente para exibição na UI
      setProfileImage(imageUri) // Definir a imagem para envio ao backend
    } else {
      console.log('Cancelado')
    }
  }

  useEffect(() => {
    // setBio('Atriz e cantora')
    setInsta('@isa.saab')
    setTiktok('@isa.saab')
  }, [])

  const handleChooseBanner = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    })

    console.log('RESPOSTA DO PICKER ' + result)

    if (!result.canceled) {
      const selectedImage = result.assets[0] // Obter o primeiro item na seleção
      const imageUri = selectedImage.uri
      const imageType = imageUri.split('.').pop()
      const formattedImageType = imageType ? `.${imageType}` : ''

      console.log('IMAGEM SELECIONADA ' + selectedImage.uri)
      console.log('TYPE IMAGE ', formattedImageType)

      setBannerType(formattedImageType) // Definir a imagem localmente para exibição na UI
      setBanner(imageUri) // Definir a imagem para envio ao backend
    } else {
      console.log('Cancelado')
    }
  }

  function handleVoltar() {
    navigation.back()
  }

  const { updateProfile } = useContext(AuthContext)

  async function fetchUpdateProfile() {
    const data = {
      username: (await AsyncStorage.getItem('username')) ?? '',
      nickname: (await AsyncStorage.getItem('nickname')) ?? '',
      biography: (await AsyncStorage.getItem('biography')) ?? '',
      instagramLink: (await AsyncStorage.getItem('instagramLink')) ?? '',
      tiktokLink: (await AsyncStorage.getItem('tiktokLink')) ?? '',
    }

    try {
      const response = await updateProfile(data)
      if (response) {
        console.log('RESPOSTA DO UPDATE PROFILE', response)
      }
      return response
    } catch (error: any) {
      console.error("Erro ao atualizar perfil")
    }
  }

  return (
    <Background>
      <View className="relative w-full flex-1">
        <View className="relative top-0 flex h-12 w-full flex-row items-center gap-3 border-b-2 border-b-[#2C2B2B] pb-8">
          <View className="absolute top-[-120%] z-40">
            <TouchableOpacity
              onPress={() => handleVoltar()}
              className="ml-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
            >
              <FontAwesome6 name="arrow-left" size={18} color="white" />
            </TouchableOpacity>
          </View>
            <View className="flex w-[100%] h-10 items-center justify-center">
              <Text className="flex items-center  text-3xl text-white font-nunitoBold">
                Editar Perfil
              </Text>
            </View>
        </View>
        <View className="flex-1">
          <ScrollView className="flex-1">
            <View className="gap-5 border-b-2 border-b-[#1C1C1C] p-8 pl-10">
              <Text className="text-2xl text-white font-nunitoBold">Foto de perfil</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1C1C1C]">
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.image}
                      className="rounded-full"
                    />
                  ) : (
                    <FontAwesome6
                      name="user"
                      size={64}
                      color="white"
                      className="items-center justify-center p-3"
                    />
                  )}
                </View>
                <TouchableOpacity
                  onPress={pickProfilePhoto}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
                >
                  <FontAwesome6 name="pen" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="gap-5 border-b-2 border-b-[#1C1C1C] p-8 pl-10">
              <Text className="text-2xl text-white font-nunitoBold">Banner</Text>
              <View className="flex flex-row items-center gap-8">
                <View className={`flex h-24 w-48 items-center justify-center ${banner ? 'bg-[#1c1c1c]' : 'bg-[#999999] rounded-lg'}`}>
                  {banner ? (
                    <Image
                      source={{ uri: banner }}
                      style={{ width: 168, height: 84, borderRadius: 8 }}
                    />
                  ) : (
                    <></>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleChooseBanner}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
                >
                  <FontAwesome6 name="pen" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="gap-5 border-b-2 border-b-[#1C1C1C] p-8 pl-10">
              <Text className="text-2xl text-white font-nunitoBold">Usuário</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex w-full flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1">
                  <TextInput
                    placeholder='@'
                    value={user}
                    maxLength={16}
                    className="h-6 w-[90%] text-[16px] text-white outline-none placeholder:text-[#BDBDBD]"
                    onChangeText={setUser}
                  />
                  <Text className="text-white">{user.length}/16</Text>
                </View>
              </View>
            </View>
            <View className="gap-5 border-b-2 border-b-[#1C1C1C] p-8 pl-10">
              <Text className="text-2xl text-white font-nunitoBold">Apelido</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex w-full flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1">
                  <TextInput
                    placeholder='Isa Saab'
                    value={nick}
                    maxLength={20}
                    className="h-6 w-[90%] text-[16px] text-white outline-none placeholder:text-[#BDBDBD]"
                    onChangeText={(e) => setNick(e)}
                  />
                  <Text className="text-white">{nick.length}/20</Text>
                </View>
              </View>
            </View>
            <View className="gap-5 border-b-2 border-b-[#1C1C1C] p-8 pl-10">
              <Text className="text-2xl text-white font-nunitoBold">Biografia</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex flex-col w-full">
                  <TextInput
                    placeholder='Conte sobre a sua vida no ROLE!'
                    value={bio}
                    maxLength={100}
                    className="h-24 w-full text-[16px] text-white outline-none placeholder:text-[#BDBDBD] rounded-lg border-[2px] p-4 border-[#1c1c1c]"
                    onChangeText={(e) => setBio(e)}
                    multiline={true}
                  />
                  <Text className="left-[86%] text-white">
                    {bio.length}/100
                  </Text>
                </View>
              </View>
            </View>
            <View className="gap-5 p-8 pl-10">
              <Text className="text-2xl text-white font-nunitoBold">Contas vinculadas</Text>
              <View className="flex flex-row items-center gap-4">
                <View className="flex h-12 w-12 items-center justify-center rounded-md bg-[#1C1C1C]">
                  <FontAwesome6 name="instagram" size={18} color="white" />
                </View>
                <View className="flex w-[80%] flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1">
                  <TextInput
                    placeholder='instagram.com/'
                    value={insta}
                    className="h-6 w-full text-[16px] text-white outline-none placeholder:text-[#BDBDBD]"
                    onChangeText={(e) => setInsta(e)}
                  />
                </View>
              </View>
              <View className="flex flex-row items-center gap-4">
                <View className="flex h-12 w-12 items-center justify-center rounded-md bg-[#1C1C1C]">
                  <FontAwesome6 name="tiktok" size={18} color="white" />
                </View>
                <View className="flex w-[80%] flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1">
                  <TextInput
                    placeholder='tiktok.com/@'
                    value={tiktok}
                    className="h-6 w-full text-[16px] text-white outline-none placeholder:text-[#BDBDBD]"
                    onChangeText={(e) => setTiktok(e)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View className="fixed bottom-0 z-40 flex h-[16%] w-full flex-row items-center justify-evenly border-t-2 border-t-[#2C2B2B] bg-background pb-6">
          <View className="flex w-[85%]">
            <RoleMainButton type="gradient" buttonFunction={fetchUpdateProfile}>
              <Text className="text-white font-nunito">Salvar</Text>
            </RoleMainButton>
          </View>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  }
})
