import { RoundedView } from '@/src/components/rounded-view'
import { Text, View, SafeAreaView } from 'react-native'

export default function Index() {
  return (
    <View className="flex h-screen w-full bg-[#6522A3]">
      {/* <RoundedView className=""></RoundedView> */}
      <SafeAreaView className="absolute bottom-0 flex h-[76%] w-full rounded-t-[32px] bg-background"></SafeAreaView>
    </View>
  )
}
