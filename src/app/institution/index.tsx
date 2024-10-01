import Background from '@/src/components/background'
import RoleCard from '@/src/components/roleCard'
import { FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function institutionScreen() {
  const navigate = useRouter()
  const [roles, setRoles] = useState([
    {
      idRole: '1',
      data: '16 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '2',
      data: '17 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '3',
      data: '18 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '4',
      data: '19 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '5',
      data: '20 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '6',
      data: '16 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '7',
      data: '17 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '8',
      data: '18 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '9',
      data: '19 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '10',
      data: '20 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '11',
      data: '16 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '12',
      data: '17 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '13',
      data: '18 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '14',
      data: '19 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '15',
      data: '20 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '16',
      data: '16 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '17',
      data: '17 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '18',
      data: '18 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '19',
      data: '19 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    },
    {
      idRole: '20',
      data: '20 DEZ',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_card_teste.png',
      title: 'São Conrado',
      type: 'Bar',
      stars: 4.5,
      local: 'Itaim'
    }
  ])
  const [scrollDisabled, setScrollDisabled] = useState(false)
  const [loadLock, setLoadLock] = useState(false)
  function loadMoreRoles() {
    setLoadLock(!loadLock)
    if (loadLock) {
      setRoles((prevRoles) => [...prevRoles, ...prevRoles])
      setLoadLock(false)
    } else {
      setLoadLock(true)
    }
  }

  function handleVoltar() {
    navigate.back()
  }
  return (
    <Background
      scrollable
      lockScroll={scrollDisabled}
      function1={loadMoreRoles}
    >
      <View className="flex w-full flex-col items-center justify-center">
        <View className="flex w-full flex-col items-center justify-center border-b-2 border-[#1c1c1c] pb-6">
          <View className="flex h-14 w-[90%] flex-row items-center justify-between rounded-full bg-[#1c1c1c]">
            <View className="flex flex-row items-center">
              <View className="ml-4 h-10 w-10 rounded-full bg-white" />
              <Text className="ml-4 text-3xl text-white">Mahau Bar</Text>
            </View>
            <View className="mr-4 h-10 w-10 rounded-full bg-white" />
          </View>
          <View className="mt-6 flex w-[90%] flex-row items-center">
            <TouchableOpacity
              onPress={() => handleVoltar()}
              className="mr-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
            >
              <FontAwesome6 name="arrow-left" size={18} color="white" />
            </TouchableOpacity>
            <View className="w-68 flex flex-col">
              <Text className="text-sm text-white">
                O Deck mais charmoso de São Paulo
              </Text>
              <Text className="text-sm text-white">
                Viva o inesquecível #MahauBar
              </Text>
            </View>
          </View>
        </View>
        <View className="gap-4">
          <View className="my-4 w-[80%]">
            <Text className="text-2xl text-white">Próximos ROLEs</Text>
          </View>
          <View className="w-[80%] gap-4">
            {roles.map((role, index) => (
              <RoleCard key={`id${role.idRole}ind${index}`} {...role} />
            ))}
          </View>
        </View>
      </View>
    </Background>
  )
}
