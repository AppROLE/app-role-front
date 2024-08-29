import { Text, View } from 'react-native'
import { Link } from 'expo-router'

export default function Index() {
  return (
    <View className="flex h-full w-full items-center justify-center bg-blue-100">
      <Text className="text-2xl font-bold text-red-500">
        EH FRONTAS DO APP ROLE
      </Text>
      <Link href={'/sign-in'}>Sign In</Link>
      <Link href={'/almost-there'}>Almost there</Link>
      <Link href={'/confirm-forgot-password'}>Confirm Forgot Password</Link>
<<<<<<< HEAD
      <Link href={'/OTPscreen'}>OTPInput</Link>
      <Link href={'/sign-up'}>Sign Up</Link>
=======
      <Link href={'/recovery-code'}>Recovery Code</Link>
>>>>>>> dev
    </View>
  )
}
