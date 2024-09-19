import Background from '@/src/components/background'
import { View, Text } from 'react-native'

export default function institutionScreen() {
  return (
    <Background>
      <View className="w-[80%] h-14 rounded-full bg-[#1c1c1c]">
        <View className='flex flex-row'>
          <View className="h-8 w-8 rounded-full bg-white" />
          <Text className="text-3xl text-white">Mahau Bar</Text>
        </View>
        <View className="h-8 w-8 rounded-full bg-white" />
      </View>
    </Background>
  )
}
