import { Slot, Stack } from 'expo-router'
import '../styles/global.css'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="opening/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="almost-there/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create-new-password/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forgot-password/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="recovery-code/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="confirm-forgot-password/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="packages/index"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
