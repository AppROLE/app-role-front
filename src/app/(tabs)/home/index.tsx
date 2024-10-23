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
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { UserContext } from '@/context/user_context'
import { EventContext } from '@/context/event_context'
import { router } from 'expo-router'
import React from 'react'
import { GradientText } from '@/src/components/gradientText'

export default function Home() {
  const [scrollDisabled, setScrollDisabled] = useState(false)
  const [disabledB, setDisabled] = useState(false)
  const [roles, setRoles] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadLock, setLoadLock] = useState(false)
  const [rolesLoaded, setRolesLoaded] = useState(20)
  const [search, setSearch] = useState('')
  const [typingTimeout, setTypingTimeout] = useState<any>(null)
  const [searchResults, setSearchResults] = useState([])
  const [phrase, setPhrase] = useState<any>()

  const { getAll } = useContext(EventContext)
  const { getRoleBombando } = useContext(EventContext)
  const { getEventsByFilter } = useContext(EventContext)
  const { getPhrase } = useContext(UserContext)

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

  const [carrosselData, setCarrosselData] = useState([])

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
      if (rolesLoaded >= roles.length) {
        return
      }
      setRolesLoaded(rolesLoaded + 10)
      setLoadLock(false)
    } else {
      setLoadLock(true)
    }
  }

  async function phraseAndFormat() {
      const response = await getPhrase()
      console.log(response)
      setPhrase(
        <Text className='text-lg'>
          {response.phrase.split('${username}').map((part, index) => (
            <React.Fragment key={index}>
              {part.split('ROLE').map((subPart, subIndex) => (
                <React.Fragment key={subIndex}>
                  {subPart}
                  {subIndex !== part.split('ROLE').length - 1 && <Text className="font-bold">ROLE</Text>}
                </React.Fragment>
              ))}
              {index !== response.phrase.split('${username}').length - 1 && <Text className="font-bold">{response.username}</Text>}
            </React.Fragment>
          ))}
        </Text>
      );
  }

  async function getEvents() {
    const response = await getAll()
    // console.log(response)
    setRoles(response.events)
  }

  async function getBombando() {
    const response = await getRoleBombando()
    // console.log('Response:' , response.data)
    for (let i = response.data.length - 1; i >= 0; i--) {
      // console.log('EventoFor', response.data[i].events[0]);
      if (response.data[i].events[0] === undefined) {
          response.data.splice(i, 1);
      }
    }
    // console.log('Response:', response.data)
    setCarrosselData(response.data)
  }

  async function getSearchFilter(filter: string) {
    const response = await getEventsByFilter('name=' + filter)
    setSearchResults(response.events)
  }

  const handleChangeText = (text: string) => {
    setSearch(text);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      if (text === '') {
        setSearchResults([]);
        return;
      } else {
        getSearchFilter(text.replace(/ /g, '+'));
      }
    }, 1000);

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    getBombando()
  }, [])

  useEffect(() => {
    phraseAndFormat()
  }, [])

  return (
    <Background text={phrase} scrollable lockScroll={scrollDisabled} function1={loadMoreRoles} centralize>
      <GradientText className="mb-4 text-center text-3xl font-nunitoBold">ROLE BOMBANDO</GradientText>
      {carrosselData.length > 1 ? (
        <View className="mx-auto">
          <Carousel
            loop
            snapEnabled
            snapToInterval={width * 0.8 + 20}
            width={width * 0.85}
            height={height * 0.21}
            autoPlay={true}
            autoPlayInterval={5000}
            data={carrosselData}
            onScrollBeginDrag={() => setScrollDisabled(true)} // Desativa o scroll vertical ao arrastar manualmente
            onScrollEndDrag={() => setScrollDisabled(false)} // Reativa o scroll vertical após soltar o arrasto
            onSnapToItem={(index) => endScroll(index)} // Atualiza o slide ativo
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <View style={{ }}>
                <RoleEmphasis {...item}/>
              </View>
            )}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10]
            }}
          />
          <View className="mt-4 flex flex-row justify-center gap-2">
            {carrosselData.length > 1 && (
              carrosselData.map((_, index) => (
                <View
                  key={index}
                  className={`h-[6px] rounded-full ${activeSlide === index ? 'w-[18px] bg-white' : 'w-[6px] bg-[#BDBDBD]'}`}
                />
              ))
            )}
          </View>
        </View>
      ) : carrosselData.length == 1 ? (
        <View className='mx-auto' style={{width: width * 0.85}}>
          <RoleEmphasis {...carrosselData[0]}/>
        </View>
      ) : (
        <View className="flex flex-row justify-center items-center">
          <Text className="text-xl font-bold text-white">Sem ROLE Bombando? Bora agitar ai!!!</Text>
        </View>
      )}
      {roles &&
        <View className="my-8 px-8">
          <View className="flex flex-row items-center justify-center rounded-full bg-[#1C1C1C] px-4 py-2">
            <TouchableOpacity className="w-[12%] flex items-start">
              <FontAwesome6 name="magnifying-glass" size={24} color="#BEBEBE" solid />
            </TouchableOpacity>
            <View className="w-[78%]">
              <TextInput
                placeholder="Encontre o seu role"
                className="text-white"
                placeholderTextColor={'#BEBEBE'}
                value={search}
                onChangeText={(text) => handleChangeText(text)}
              />
            </View>
            <TouchableOpacity className="w-[10%] flex items-end"
              onPress={() => router.push('/searching-filters')}
            >
              <FontAwesome6 name="bars" size={24} color="#BEBEBE" solid />
            </TouchableOpacity>
          </View>
        </View>
      }
      { searchResults == undefined ?
      <View>
        <Text className="text-lg text-center font-bold text-purple-500">Nehum <Text className='font-bold'>ROLE</Text> encontrado</Text>
      </View>
      :
      searchResults.length > 0 ? 
        <View className="flex flex-col gap-4 px-8">
          {searchResults.map((role, index) => (
            <RoleCard key={`id${role.idRole}ind${index}`} {...role} />
          ))}
        </View>
        :
        <View className="flex flex-col gap-4 px-8">
          {roles ? <>
            <Text className="text-3xl font-bold text-white">Explore</Text>
            {roles.slice(0, 5).map((role, index) => (
              <RoleCard key={`id${role.eventId}ind${index}`} {...role} />
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
            {roles.slice(10, rolesLoaded).map((role, index) => (
              <RoleCard key={`id${role.idRole}ind${index}`} {...role} />
            ))}
            <View className="mt-8 pb-8">
              <Text className="text-center text-lg text-[#BDBDBD]">Não encontrou o que procurava?</Text>
              <Text className="text-center text-lg text-[#BDBDBD]">
                Utilieze os nossos <Text className="font-bold text-white">Filtros!</Text>
              </Text>
              <TouchableOpacity className="flex w-full justify-center rounded-2xl py-4"
                onPress={() => router.push('/searching-filters')}
              >
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
          </>
          :
          <>
            <View className='mt-12'>
              <Text className='text-center text-purple-500 font-bold text-lg'>Estamos sem ROLES 😱</Text>
            </View>
          </>
            }
        </View>
      }
    </Background>
  )
}
