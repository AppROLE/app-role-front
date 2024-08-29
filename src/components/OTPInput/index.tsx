import { RefObject } from 'react'
import {
  TextInput,
  View,
  StyleSheet,
  TextInputKeyPressEventData
} from 'react-native'

interface OTPInputProps {
  codes: string[]
  refs: RefObject<TextInput>[]
  onChangeCode: (text: string, index: number) => void
}

export function RecoveryCodeInput({
  codes,
  refs,
  onChangeCode
}: OTPInputProps) {
  const handleChange = (text: string, index: number) => {
    const filteredText = text.replace(/[^0-9]/g, '')

    onChangeCode(filteredText, index)

    if (filteredText && index < refs.length - 1) {
      refs[index + 1]?.current?.focus()
    }
  }

  const handleKeyPress = (
    nativeEvent: TextInputKeyPressEventData,
    index: number
  ) => {
    if (nativeEvent.key === 'Backspace') {
      if (!codes[index] && index > 0) {
        refs[index - 1]?.current?.focus()
      } else {
        onChangeCode('', index)
      }
    }
  }

  return (
    <View style={styles.container}>
      {codes.map((code, index) => (
        <TextInput
          key={index}
          ref={refs[index]}
          value={code}
          keyboardType="numeric"
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, index)}
          style={[styles.input, { borderColor: code ? '#5A189A' : '#CCC' }]}
          maxLength={1}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '86%'
  },
  input: {
    width: '14%',
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    height: 52,
    textAlign: 'center',
    fontSize: 24,
    color: '#FFFFFF'
  }
})
