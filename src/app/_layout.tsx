import { Slot, Stack } from 'expo-router'
import '../styles/global.css'
import { AuthContextProvider } from '@/context/auth_context'
import ReviewContextProvider from '@/context/review_context'

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <ReviewContextProvider>
        <Stack>
          <Stack.Screen
            name="sign-in/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sign-up/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="opening/index"
            options={{ headerShown: false }}
          />
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
            name="searching-filters/index"
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
            name="editing-perfil/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="configs/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="configs/delete/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="role-description/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="privacy/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="account/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="event-description/index"
            options={{ headerShown: false }}
          />
        </Stack>
      </ReviewContextProvider>
    </AuthContextProvider>
  )
}