import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useState } from 'react'
import { View, TextInput } from 'react-native'

interface SearchingBarInputProps {
  search: string
  setSearch: (value: string) => void
}

export default function SearchingBarInput({
  search,
  setSearch
}: SearchingBarInputProps) {
  return (
    <View className="flex h-12 w-[76%] flex-row items-center gap-2 rounded-full bg-[#1C1C1C] pl-3">
      <FontAwesome6 name="magnifying-glass" size={24} color="#BDBDBD" />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Encontre o seu ROLE!"
        placeholderTextColor="#BDBDBD"
        className="h-full w-full text-white"
      />
    </View>
  )
}
