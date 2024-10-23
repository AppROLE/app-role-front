import { getInstituteByIdResponseDTO, Institute } from '@/api/types/institute_dto'
import { InstituteContext } from '@/context/institute_context'
import Background from '@/src/components/background'
import RoleCard from '@/src/components/roleCard'
import SocialCard from '@/src/components/socialCard'
import { FontAwesome6 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface intutionScreenProps {
  instituteId: string
}

export default function institutionScreen({instituteId}: intutionScreenProps) {
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
  const institute = {
    title: 'Mahau bar',
    descriptions: 'O Deck mais charmoso de São Paulo \nViva o inesquecível #MahauBar'
  }

  const [scrollDisabled, setScrollDisabled] = useState(false)
  const [loadLock, setLoadLock] = useState(false)
  function loadMoreRoles() {
    setLoadLock(!loadLock)
    if (loadLock) {
      setRoles(prevRoles => [...prevRoles, ...prevRoles])
      setLoadLock(false)
    } else {
      setLoadLock(true)
    }
  }

  function handleVoltar() {
    navigate.back()
  }

  const [instituteA, setInstituteA] = useState<getInstituteByIdResponseDTO>()
  const { updateFavoriteInstitute, getInstituteById } = useContext(InstituteContext)


  async function getInstitute() { 
    const instituteIde = '2f3073ac-3633-4fc7-9cfe-c2084399bbc3'
    const response = await getInstituteById(instituteIde)
    if (response) {
      setInstituteA(response)
    }
    console.log('RESPOSTA DA GET', response)
  }


  useEffect(() => { 
    getInstitute()
  }, [])

  return (
    <Background scrollable lockScroll={scrollDisabled} function1={loadMoreRoles}>
      <View className="flex w-full flex-col items-center justify-center">
        <SocialCard title={instituteA?.name} image={instituteA?.logo_photo}/>
        <View className="flex w-full flex-col items-center justify-center border-b-2 border-[#1c1c1c] pb-6">
          <View className="mt-6 flex w-[90%] flex-row items-center">
            <TouchableOpacity
              onPress={() => handleVoltar()}
              className="mr-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
            >
              <FontAwesome6 name="arrow-left" size={18} color="white" />
            </TouchableOpacity>
            <View className="w-68 flex flex-col pr-4">
              <Text className="text-wrap font-nunito text-sm text-white">{institute.descriptions}</Text>
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
