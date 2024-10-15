import Background from '@/src/components/background'
import RoleMainButton from '@/src/components/roleMainButton'
import SearchingBarInput from '@/src/components/searchingBarInput'
import AnimatedOption from '@/src/components/selectedCard'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import SvgUri from 'react-native-svg'

interface Filter {
  icon: string
  title: string
  options: { label: string; value: string }[]
  selected: number | null | number[]
}

const initialFilters = [
  {
    icon: 'location-dot',
    title: 'Região',
    options: [
      { label: 'Zona Sul', value: 'south' },
      { label: 'Zona Norte', value: 'north' },
      { label: 'Zona Leste', value: 'east' },
      { label: 'Zona Oeste', value: 'west' },
      { label: 'ABC Paulista', value: 'abc' },
      { label: 'Outros', value: 'others' },
      { label: 'Mais Populares', value: 'popular' }
    ],
    selected: []
  },
  {
    icon: 'store',
    title: 'Tipo de ROLE',
    options: [
      { label: 'Balada', value: 'balad' },
      { label: 'Universitário', value: 'universitarian' },
      { label: 'Bar', value: 'bar' },
      { label: 'Show', value: 'show' },
      { label: 'Festa', value: 'Party' },
      { label: 'Festival', value: 'festival' },
      { label: 'Bar Balada', value: 'bar-balad' }
    ],
    selected: []
  },
  {
    icon: 'music',
    title: 'Gênero Musical',
    options: [
      { label: 'Funk', value: 'funk' },
      { label: 'Sertanejo', value: 'sertanejo' },
      { label: 'POP', value: 'pop' },
      { label: 'Rock', value: 'rock' },
      { label: 'Eletrônica', value: 'eletronic' },
      { label: 'Rap', value: 'rap' },
      { label: 'Pagode', value: 'pagode' },
      { label: 'MPB', value: 'mpb' },
      { label: 'Forró', value: 'forro' },
      { label: 'Reggae', value: 'reggae' },
      { label: 'Trap', value: 'trap' }
    ],
    selected: []
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
    selected: '[]'
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
    selected: []
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
      { label: 'Fumódromo', value: 'smoking-area' },
      { label: 'Valet', value: 'valet' },
      { label: 'Área Aberta', value: 'open-area' },
      { label: 'Welcome Shot', value: 'welcome-shot' },
      { label: 'Messas', value: 'tables' },
      { label: 'Ao Vivo', value: 'live' },
      { label: 'Esquenta', value: 'warm-up' },
      { label: 'After', value: 'after' }
    ],
    selected: []
  },
  {
    icon: 'user',
    title: 'Amigos',
    options: [{ label: 'Apenas Amigos', value: 'only-friends' }],
    selected: []
  }
]

export default function SearchingFilters() {
  const navigation = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)
  const [search, setSearch] = useState('')

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [dateSelected, setDateSelected] = useState(false)
  const [formattedDate, setFormattedDate] = useState('DD/MM/YYYY')

  const [filters, setFilters] = useState<Filter[]>(
    initialFilters.map((filter) => ({ ...filter, selected: null }))
  )

  const handleOptionSelect = (filterIndex: number, optionIndex: number) => {
    const newFilters = [...filters]
    const filter = newFilters[filterIndex]

    if (filter.title === 'Avaliação') {
      filter.selected = optionIndex === filter.selected ? null : optionIndex
    } else {
      const selectedOptions = Array.isArray(filter.selected)
        ? filter.selected
        : []
      if (selectedOptions.includes(optionIndex)) {
        filter.selected = selectedOptions.filter(
          (index) => index !== optionIndex
        )
      } else {
        filter.selected = [...selectedOptions, optionIndex]
      }
    }

    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setIsDisabled(true)
    const clearedFilters = filters.map((filter) => ({
      ...filter,
      selected: null
    }))
    setDate(new Date())
    setFormattedDate('DD/MM/YYYY')
    setDateSelected(false)
    setFilters(clearedFilters)
    setTimeout(() => {
      setIsDisabled(false)
    }, 500)
  }

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date
    setShowPicker(false)
    setDate(currentDate)

    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = currentDate.getFullYear()

    setFormattedDate(`${day}/${month}/${year}`)
    setDateSelected(true)
  }

  function handleVoltar() {
    navigation.back()
  }

  function handleClosePicker() {
    setShowPicker(false)
  }

  return (
    <Background>
      <View className="relative w-full flex-1">
        <View className="absolute top-0 flex h-12 w-full flex-row items-center gap-3 border-b-2 border-b-[#2C2B2B] pb-8">
          <TouchableOpacity
            onPress={() => handleVoltar()}
            className="ml-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
          >
            <FontAwesome6 name="arrow-left" size={18} color="white" />
          </TouchableOpacity>
          <SearchingBarInput search={search} setSearch={setSearch} />
        </View>
        <View className="flex-1">
          <ScrollView className="mt-12 flex-1">
            <View
              className={` mb-8 flex flex-col gap-2  pb-2 pt-5`}
            >
              <View className="flex flex-row">
                <View className="ml-4 mt-4">
                  <FontAwesome6 name="calendar" size={20} color="white" />
                </View>
                <Text className="ml-2 mt-4 text-lg text-white font-nunito">Data</Text>
              </View>
              <View className="mx-2 mt-2 flex flex-row flex-wrap">
                <AnimatedOption
                  label={formattedDate}
                  selected={dateSelected}
                  onPress={() => setShowPicker(true)}
                />
              </View>
            </View>
            {filters.map((filter, index) => (
              <View
                key={index}
                className={`border-t-2 mb-8 flex flex-col gap-2 border-t-[#2C2B2B] pb-2 pt-5`}
              >
                <View className="flex flex-row">
                  <View className="ml-4 mt-4">
                    <FontAwesome6 name={filter.icon} size={20} color="white" />
                  </View>
                  <Text className="ml-2 mt-4 text-lg text-white font-nunito">
                    {filter.title}
                  </Text>
                </View>
                <View className={`mx-2 mt-2 flex flex-row flex-wrap`}>
                  {filter.options.map((option, optionIndex) => (
                    <View key={optionIndex} className="m-1">
                      <AnimatedOption
                        label={option.label}
                        selected={
                          filter.title === 'Avaliação'
                            ? filter.selected === optionIndex
                            : Array.isArray(filter.selected) &&
                              filter.selected.includes(optionIndex)
                        }
                        onPress={() => handleOptionSelect(index, optionIndex)}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="fixed bottom-0 z-40 flex h-[16%] w-full flex-row items-center justify-evenly border-t-2 border-t-[#2C2B2B] bg-background pb-6">
          <View className="flex w-[40%]">
            <RoleMainButton type="simple" buttonFunction={handleClearFilters}>
              <Text className="text-white font-nunito">Limpar Filtros</Text>
            </RoleMainButton>
          </View>
          <View className="flex w-[40%]">
            <RoleMainButton type="gradient">
              <Text className="text-white font-nunito">Pesquisar</Text>
            </RoleMainButton>
          </View>
        </View>

        {showPicker && (
          <View className="absolute inset-0 flex z-50 bg-transparent mt-20 w-[100vw] p-5">
            <View className="relative flex justify-center items-center bg-black rounded-3xl">
              <View className="w-[90%] flex p-4 rounded-lg mx-auto">
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="inline"
                  accentColor="#9C4EDC"
                  themeVariant='dark'
                  minimumDate={new Date()}
                  onChange={handleDateChange}
                />
                <TouchableOpacity
                  onPress={handleClosePicker}
                  className="mt-4 p-2 bg-[#1C1C1C] rounded-full items-center justify-center"
                >
                  <Text className="text-white">Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </Background>
  )
}