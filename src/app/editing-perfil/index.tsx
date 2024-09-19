import Background from '@/src/components/background'
import RoleInput from '@/src/components/input'
import RoleMainButton from '@/src/components/roleMainButton'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput
} from 'react-native'

export default function EditingPerfil() {
  const navigation = useRouter()
  const [userErr, setUserErr] = useState('')
  const [nickErr, setNickErr] = useState('')
  const [bioErr, setBioErr] = useState('')
  const [instaErr, setInstaErr] = useState('')
  const [tiktokErr, setTiktokErr] = useState('')

  const [profileImage, setProfileImage] = useState('')
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
    setUser('@isa.saab')
    setNick('Isa Saab')
    setBio('Atriz e cantora')
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

  return (
    <Background>
      <View className="relative w-full flex-1">
        <View className="relative top-0 flex h-12 w-full flex-row items-center gap-3 border-b-2 border-b-[#2C2B2B] pb-8">
          <View className="absolute top-[-120%] z-40 h-12">
            <TouchableOpacity
              onPress={() => handleVoltar()}
              className="ml-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
            >
              <FontAwesome6 name="arrow-left" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex h-[300%] w-[100%] items-center">
            <Text className="flex h-[300%] items-center text-3xl text-white">
              Editar Perfil
            </Text>
          </View>
        </View>
        <View className="flex-1">
          <ScrollView className="flex-1">
            <View className="gap-5 border-b-2 border-b-[#1C1C1C] p-8 pl-10">
              <Text className="text-2xl text-white">Foto de perfil</Text>
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
              <Text className="text-2xl text-white">Banner</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex h-24 w-48 items-center justify-center bg-[#1c1c1c]">
                  {banner ? (
                    <Image
                      source={{ uri: banner }}
                      style={{ width: 168, height: 84 }}
                    />
                  ) : (
                    <FontAwesome6
                      name="landscape"
                      size={64}
                      color="white"
                      className="items-center justify-center p-3"
                    />
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
              <Text className="text-2xl text-white">Usuário</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex w-full flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1">
                  <TextInput
                    placeholder={user}
                    maxLength={16}
                    className="h-6 w-[90%] text-[16px] text-white outline-none placeholder:text-[#BDBDBD]"
                    onChangeText={(e) => setUser(e)}
                  />
                  <Text className="text-white">{user.length}/16</Text>
                </View>
              </View>
            </View>
            <View className="gap-5 border-b-2 border-b-[#1C1C1C] p-8 pl-10">
              <Text className="text-2xl text-white">Apelido</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex w-full flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1">
                  <TextInput
                    placeholder={nick}
                    maxLength={20}
                    className="h-6 w-[90%] text-[16px] text-white outline-none placeholder:text-[#BDBDBD]"
                    onChangeText={(e) => setNick(e)}
                  />
                  <Text className="text-white">{nick.length}/20</Text>
                </View>
              </View>
            </View>
            <View className="gap-5 border-b-2 border-b-[#1C1C1C] p-8 pl-10">
              <Text className="text-2xl text-white">Biografia</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex flex-col">
                  <View className="flex h-20 w-full flex-row items-baseline gap-2 rounded-lg border-[2px] p-2 border-[#1c1c1c] pb-1">
                    <TextInput
                      placeholder={bio}
                      maxLength={100}
                      className="h-20 w-full text-center text-[16px] text-white outline-none placeholder:text-[#BDBDBD]"
                      onChangeText={(e) => setBio(e)}
                      multiline={true}
                    />
                  </View>
                  <Text className="left-[86%] text-white">
                    {bio.length}/100
                  </Text>
                </View>
              </View>
            </View>
            <View className="gap-5 p-8 pl-10">
              <Text className="text-2xl text-white">Contas vinculadas</Text>
              <View className="flex flex-row items-center gap-4">
                <View className="flex h-12 w-12 items-center justify-center rounded-md bg-[#1C1C1C]">
                  <FontAwesome6 name="instagram" size={18} color="white" />
                </View>
                <View className="flex w-[80%] flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1">
                  <TextInput
                    placeholder={insta}
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
                    placeholder={tiktok}
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
            <RoleMainButton type="gradient">
              <Text className="text-white">Salvar</Text>
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
