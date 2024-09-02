import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React, { useEffect } from 'react'
import { Modal, View, Text, Pressable } from 'react-native'

interface TermsAndConditionsModalProps {
  isVisible: boolean
}

export default function TermsAndConditionsModal({
  isVisible
}: TermsAndConditionsModalProps) {
  const [visible, setVisible] = React.useState(false)
  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className="relative flex h-full w-full items-center bg-white p-5 pt-20">
        <Pressable
          className="absolute left-4 top-4"
          onPress={() => setVisible(false)}
        >
          <FontAwesome6 name="arrow-left" size={48} />
        </Pressable>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
          officia quia fuga dolor debitis fugiat nesciunt quos recusandae
          dolorem, iste laudantium numquam alias ipsum molestias quod, qui
          temporibus adipisci impedit.
        </Text>
      </View>
    </Modal>
  )
}
