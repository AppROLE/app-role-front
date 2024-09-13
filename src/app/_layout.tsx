import { Slot, Stack } from 'expo-router'
import '../styles/global.css'
import { AuthContextProvider } from '@/context/auth_context'

export default function RootLayout() {
  return (
    <AuthContextProvider>
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
          name="friends/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notifications/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="first-page/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="account/index"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthContextProvider>
  )
}