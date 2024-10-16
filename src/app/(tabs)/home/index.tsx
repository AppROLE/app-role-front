import Background from '@/src/components/background'
import CategoryMusicalCard from '@/src/components/category-musicalCard'
import RoleCard from '@/src/components/roleCard'
import RoleEmphasis from '@/src/components/roleEmphasis'
import { FontAwesome6 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { UserContext } from '@/context/user_context'

export default function Home() {
  const [scrollDisabled, setScrollDisabled] = useState(false)
  const [disabledB, setDisabled] = useState(false)
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
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadLock, setLoadLock] = useState(false)
  const { getPhrase } = useContext(UserContext)
  const [phrase, setPhrase] = useState('')

  const [typesRole, setTypesRole] = useState([
    {
      name: 'Bar',
      type: 'Musical'
    },
    {
      name: 'Balada',
      type: 'Musical'
    },
    {
      name: 'Bar',
      type: 'Musical'
    },
    {
      name: 'Balada',
      type: 'Musical'
    },
    {
      name: 'Bar',
      type: 'Musical'
    },
    {
      name: 'Balada',
      type: 'Musical'
    },
    {
      name: 'Bar',
      type: 'Musical'
    },
    {
      name: 'Balada',
      type: 'Musical'
    },
    {
      name: 'Bar',
      type: 'Musical'
    },
    {
      name: 'Balada',
      type: 'Musical'
    }
  ])

  const [musicRole, setMusicRole] = useState([
    {
      name: 'Eletrônica',
      type: 'Musical'
    },
    {
      name: 'Funk',
      type: 'Musical'
    },
    {
      name: 'Sertanejo',
      type: 'Musical'
    },
    {
      name: 'Eletrônica',
      type: 'Musical'
    },
    {
      name: 'Funk',
      type: 'Musical'
    },
    {
      name: 'Sertanejo',
      type: 'Musical'
    },
    {
      name: 'Eletrônica',
      type: 'Musical'
    },
    {
      name: 'Funk',
      type: 'Musical'
    },
    {
      name: 'Sertanejo',
      type: 'Musical'
    },
    {
      name: 'Eletrônica',
      type: 'Musical'
    }
  ])

  const [carrosselData, setCarrosselData] = useState([
    {
      id: '1',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png'
    },
    {
      id: '2',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png'
    },
    {
      id: '3',
      image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png'
    }
  ])

  const { width, height } = Dimensions.get('window')

  const gradientColors = disabledB
    ? ['rgba(90, 24, 154, 0.25)', 'rgba(156, 78, 220, 0.25)'] // Cores do gradiente com brilho reduzido
    : ['#5A189A', '#DFA9FD'] // Cores normais do gradiente

  function endScroll(index: SetStateAction<number>) {
    setActiveSlide(index)
    setScrollDisabled(false)
  }

  function loadMoreRoles() {
    setLoadLock(!loadLock)
    if (loadLock) {
      setRoles([...roles, ...roles])
      console.log(roles.length)
      setLoadLock(false)
    } else {
      setLoadLock(true)
    }
  }

  async function getThePhrase() {
    const response = await getPhrase()
    setPhrase(response.phrase)
  }

  useEffect(() => {
    getThePhrase()
  }, [])

  return (
    <Background text={phrase} scrollable lockScroll={scrollDisabled} function1={loadMoreRoles} centralize>
      <Text className="mb-4 text-center text-3xl font-bold text-white">Role Bombando</Text>
      <View className="mb-10 px-12">
        <Carousel
          loop
          snapEnabled // Ativa o snap (encaixar) dos itens
          snapToInterval={width * 0.8 + 20}
          width={width * 0.8}
          height={height * 0.18}
          autoPlay={true}
          autoPlayInterval={5000}
          data={carrosselData}
          onScrollBegin={() => setScrollDisabled(true)} // Desabilita o scroll da tela
          onScrollEnd={index => endScroll(index)} // Atualiza o slide ativo
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 10 }}>
              <RoleEmphasis />
            </View>
          )}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10] // Para evitar conflitos com scroll vertical
          }}
        />
        <View className="mt-4 flex flex-row justify-center gap-2">
          {carrosselData.map((_, index) => (
            <View
              key={index}
              className={`h-[6px] rounded-full ${activeSlide === index ? 'w-[18px] bg-white' : 'w-[6px] bg-[#BDBDBD]'}`}
            />
          ))}
        </View>
      </View>
      <View className="mb-12 px-12">
        <View className="flex flex-row items-center rounded-full bg-[#1C1C1C] px-2 py-1">
          <View className="w-[12%]">
            <FontAwesome6 name="magnifying-glass" size={24} color="#BEBEBE" solid />
          </View>
          <View className="w-[78%]">
            <TextInput
              placeholder="Encontre o seu role"
              className="text-white"
              placeholderTextColor={'#BEBEBE'}
            />
          </View>
          <View className="w-[10%]">
            <FontAwesome6 name="bars" size={24} color="#BEBEBE" solid />
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-4 px-12">
        <Text className="text-3xl font-bold text-white">Explore</Text>
        {roles.slice(0, 5).map((role, index) => (
          <RoleCard key={`id${role.idRole}ind${index}`} {...role} />
        ))}
        <View>
          <Text className="mb-2 mt-3 text-2xl font-bold text-white">Categorias</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 16 }}
          >
            {typesRole.map((type, index) => (
              <View key={`viewtype-${type.name}-${index}`}>
                <CategoryMusicalCard key={`cardtype-${type.name}-${index}`} {...type} />
              </View>
            ))}
          </ScrollView>
        </View>
        {roles.slice(5, 10).map((role, index) => (
          <RoleCard key={`id${role.idRole}ind${index}`} {...role} />
        ))}
        <View>
          <Text className="mb-2 mt-3 text-2xl font-bold text-white">Gênero Musical</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 16 }}
          >
            {musicRole.map((music, index) => (
              <CategoryMusicalCard key={`music-${music.name}-${index}`} {...music} />
            ))}
          </ScrollView>
        </View>
        {roles.slice(10).map((role, index) => (
          <RoleCard key={`id${role.idRole}ind${index}`} {...role} />
        ))}
        <View className="mt-8 pb-8">
          <Text className="text-center text-lg text-[#BDBDBD]">Não encontrou o que procurava?</Text>
          <Text className="text-center text-lg text-[#BDBDBD]">
            Utilieze os nossos <Text className="font-bold text-white">Filtros!</Text>
          </Text>
          <TouchableOpacity className="flex w-full justify-center rounded-2xl py-4">
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} // Gradiente diagonal suave
              style={{
                width: '25%',
                marginHorizontal: 'auto',

                paddingVertical: 6,
                paddingHorizontal: 8,
                borderRadius: 20, // Bordas arredondadas
                alignItems: 'center',

                shadowColor: 'rgba(156, 78, 220, 1)', // Cor da sombra
                shadowOffset: { width: 0, height: 7 }, // Deslocamento da sombra
                shadowOpacity: 1, // Opacidade da sombra
                shadowRadius: 11, // Raio de desfoque
                elevation: 10
              }}
            >
              <Text className="text-lg text-white">Filtrar</Text>
            </LinearGradient>
          </TouchableOpacity>
          {loadLock && <View className="flex h-1 w-full justify-center bg-transparent"></View>}
        </View>
      </View>
    </Background>
  )
}
