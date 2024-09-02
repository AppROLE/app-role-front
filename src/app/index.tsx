import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import RoleCard from '../components/roleCard'
import CategoryCard from '../components/category-musicalCard'
import RoleMainButton from '../components/roleMainButton'
import { useState } from 'react'

export default function Index() {
  const [buttonDisabled, setButtonDisabled] = useState(false)

  function teste () {
    console.log('teste')
    // setButtonDisabled(true)
    // setTimeout(() => {
    //   setButtonDisabled(false)
    // }, 3000)
  }

  return (
    <View className="flex h-full w-full items-center justify-center bg-blue-100">
      <Text className="text-2xl font-bold text-red-500">
        EH FRONTAS DO APP ROLE
      </Text>
      <Link href={'/first-page'}>First Page</Link>
      <Link href={'/opening'}>Opening</Link>
      <Link href={'/sign-in'}>Sign In</Link>
      <Link href={'/almost-there'}>Almost there</Link>
      <Link href={'/confirm-forgot-password'}>Confirm Forgot Password</Link>
      <Link href={'/sign-up'}>Sign Up</Link>
      <Link href={'/recovery-code'}>Recovery Code</Link>
      <Link href={'/forgot-password'}>Forgot Password</Link>
      <Link href={'/home'}>Home</Link>
      
      {/* View para testar os components */}
      <View className="my-5 w-full bg-[#121212]">
        {/* <RoleMainButton type='gradient' buttonFunction={teste} disabled={buttonDisabled}>
          <Text className='text-white text-base'>AAA</Text>
        </RoleMainButton> */}
        {/* <RoleCard data={'16 DEZ'} image={'https://placehold.co/600x400'} title={'São Conrado'} type={'Bar'} stars={4.5} local={'Itaim'} idRole={'1'}/> */}
        {/* <CategoryCard type='Musical' name='Pagode'/> */}
      </View>
    </View>
  )
}
