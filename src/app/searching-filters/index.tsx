import Background from '@/src/components/background'
import RoleMainButton from '@/src/components/roleMainButton'
import SearchingBarInput from '@/src/components/searchingBarInput'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'

interface Filter {
  icon: string
  title: string
  options: { label: string; value: string }[]
  selected: number | null
}

const initialFilters = [
  {
    icon: 'calendar',
    title: 'Data',
    options: [
      { label: 'Hoje', value: 'today' },
      { label: 'Amanhã', value: 'tomorrow' },
      { label: 'Esta Semana', value: 'this-week' },
      { label: 'Este Mês', value: 'this-month' },
      { label: 'Personalizado', value: 'custom' }
    ],
    selected: null
  },
  {
    icon: 'location-dot',
    title: 'Região',
    options: [
      { label: 'Zona Sul', value: 'south' },
      { label: 'Zona Norte', value: 'north' },
      { label: 'Zona Leste', value: 'east' },
      { label: 'Zona Oeste', value: 'west' },
      { label: 'ABC Paulista', value: 'abc' },
      { label: 'Outros', value: 'others' }
    ],
    selected: null
  },
  {
    icon: 'store',
    title: 'Tipo de ROLE',
    options: [
      { label: 'Balada', value: 'balad' },
      { label: 'Universitário', value: 'universitarian' },
      { label: 'Bar', value: 'bar' },
      { label: 'Show', value: 'show' },
      { label: 'Festa', value: 'Party' }
    ],
    selected: null
  },
  {
    icon: 'music',
    title: 'Gênero Musical',
    options: [
      { label: 'Funk', value: 'funk' },
      { label: 'Sertanejo', value: 'sertanejo' },
      { label: 'Pop', value: 'pop' },
      { label: 'Rock', value: 'rock' },
      { label: 'Eletrônica', value: 'eletronic' },
      { label: 'Rap', value: 'rap' },
      { label: 'Samba', value: 'samba' },
      { label: 'Pagode', value: 'pagode' },
      { label: 'MPB', value: 'mpb' },
      { label: 'Forró', value: 'forro' },
      { label: 'Reggae', value: 'reggae' }
    ],
    selected: null
  },
  {
    icon: 'sack-dollar',
    title: 'Preço',
    options: [
      { label: '$', value: 'free' },
      { label: '$$', value: 'cheap' },
      { label: '$$$', value: 'expensive' },
      { label: '$$$$', value: 'very-expensive' },
      { label: '$$$$$', value: 'luxury' }
    ],
    selected: 'null'
  },
  {
    icon: 'user-shield',
    title: 'Idade',
    options: [
      { label: '18-20', value: '18-20' },
      { label: '21-25', value: '21-25' },
      { label: '26-30', value: '26-30' },
      { label: '31-40', value: '31-40' },
      { label: '40+', value: '40+' }
    ],
    selected: null
  },
  {
    icon: 'star',
    title: 'Avaliação',
    options: [
      { label: 'Mais Altas', value: 'greatest' },
      { label: 'Na Média', value: 'medium' },
      { label: 'Mais Baixas', value: 'lowest' }
    ],
    selected: null
  },
  {
    icon: 'diamond',
    title: 'Features',
    options: [
      { label: 'Open Bar', value: 'open-bar' },
      { label: 'Estacionamento', value: 'parking' },
      { label: 'Vip', value: 'vip' }
    ],
    selected: null
  },
  {
    icon: 'user',
    title: 'Amigos',
    options: [{ label: 'Apenas Amigos', value: 'only-friends' }],
    selected: null
  }
]

export default function SearchingFilters() {
  const navigation = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filter[]>(
    initialFilters.map((filter) => ({ ...filter, selected: null }))
  )

  const handleOptionSelect = (
    filterIndex: number,
    optionIndex: number | null
  ) => {
    const newFilters = [...filters]
    newFilters[filterIndex].selected = optionIndex
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setIsDisabled(true)
    const clearedFilters = filters.map((filter) => ({
      ...filter,
      selected: null
    }))
    setFilters(clearedFilters)
    setTimeout(() => {
      setIsDisabled(false)
    }, 500)
  }

  function handleVoltar() {
    console.log('voltar')
    if (navigation.canGoBack()) {
      navigation.back()
    } else {
      navigation.push({ pathname: '/' })
    }
  }

  return (
    <Background>
      <View className="relative w-full flex-1">
        <View className="absolute top-0 flex h-12 w-full flex-row items-center gap-3 border-b-2 border-b-[#2C2B2B] pb-8">
          <Pressable onPress={() => handleVoltar()}>
            <View className="ml-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]">
              <FontAwesome6 name="arrow-left" size={20} color="white" />
            </View>
          </Pressable>
          <SearchingBarInput search={search} setSearch={setSearch} />
        </View>
        <View className="flex-1">
          <ScrollView className="mb-24 mt-12 flex-1">
            {filters.map((filter, index) => (
              <View
                key={index}
                className={`mb-8 flex flex-col gap-2 pb-2 pt-5 ${filter.title === 'Data' ? '' : 'border-t-2 border-t-[#2C2B2B]'}`}
              >
                <View className="flex flex-row">
                  <View className="ml-4 mt-4">
                    <FontAwesome6 name={filter.icon} size={20} color="white" />
                  </View>
                  <Text className="ml-2 mt-4 text-lg text-white">
                    {filter.title}
                  </Text>
                </View>
                <View className="mx-2 mt-2 flex flex-row flex-wrap">
                  {filter.options.map((option, optionIndex) => (
                    <View key={optionIndex} className="m-1">
                      {filter.selected === optionIndex ? (
                        <Pressable
                          onPress={() => handleOptionSelect(index, null)}
                        >
                          <LinearGradient
                            colors={['#5A189A', '#9C4EDC']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }} // Gradiente diagonal suave
                            style={{
                              paddingVertical: 12,
                              paddingHorizontal: 30,
                              borderRadius: 20, // Bordas arredondadas
                              alignItems: 'center',
                              shadowColor: 'rgba(156, 78, 220, 0.3)', // Cor da sombra
                              shadowOffset: { width: 0, height: 7 }, // Deslocamento da sombra
                              shadowOpacity: 1, // Opacidade da sombra
                              shadowRadius: 11, // Raio de desfoque
                              elevation: 10
                            }}
                          >
                            <Text className="text-xs text-white">
                              {option.label}
                            </Text>
                          </LinearGradient>
                        </Pressable>
                      ) : (
                        <Pressable
                          className="flex flex-row items-center justify-center gap-4 bg-[#1C1C1C]"
                          style={{
                            paddingVertical: 12,
                            paddingHorizontal: 30,
                            borderRadius: 20
                          }}
                          onPress={() => handleOptionSelect(index, optionIndex)}
                        >
                          <Text className="text-xs text-[#BDBDBD]">
                            {option.label}
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="fixed bottom-0 z-40 flex h-24 w-full flex-row items-center justify-evenly border-t-2 border-t-[#2C2B2B] bg-background pb-6">
          <View className="flex w-[40%]">
            <RoleMainButton type="simple" buttonFunction={handleClearFilters}>
              <Text className="text-white">Limpar Filtros</Text>
            </RoleMainButton>
          </View>
          <View className="flex w-[40%]">
            <RoleMainButton type="gradient">
              <Text className="text-white">Pesquisar</Text>
            </RoleMainButton>
          </View>
        </View>
      </View>
    </Background>
  )
}
