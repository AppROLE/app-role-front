import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Link, router } from 'expo-router'
import RoleCard from '../components/roleCard'
import CategoryCard from '../components/category-musicalCard'
import RoleMainButton from '../components/roleMainButton'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font';
import Fonte from '../../assets/fonts/Nunito-Regular.ttf'
import FonteBold from '../../assets/fonts/Nunito-Bold.ttf'

export default function Index() {
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false);

  
  
  function teste() {
    console.log('teste')
    // setButtonDisabled(true)
    // setTimeout(() => {
      //   setButtonDisabled(false)
      // }, 3000)
    }
    
    function saveAsync() {
      AsyncStorage.setItem('emaiu', 'joao@emaiu')
      AsyncStorage.setItem('passwordi', '123456')
    }
    
    function clearAsync() {
      AsyncStorage.clear()
    }
    
    useEffect(() => {
      async function loadFonts() {
        await Font.loadAsync({
          Nunito: Fonte, 
          NunitoBold: FonteBold
        });
        setFontsLoaded(true);
      }
      loadFonts();
    }, []);

    if (!fontsLoaded) {
      return null; // 
    }

  return (
    <SafeAreaView className='font-sans flex-1 text-black'>
      <View className="flex h-full w-full items-center justify-center bg-blue-100">
        <Text className="text-2xl font-sans text-red-500">
          EH FRONTAS DO APP ROLE
        </Text>
        <Link href={'/first-page'}>First Page</Link>
        <Link href={'/opening'}>Opening</Link>
        <Link href={'/sign-in'}>Sign In</Link>
        <Link href={'/sign-up'}>Sign Up</Link>
        <TouchableOpacity>
          <Link href={{
            pathname: '/almost-there',
            params: { emaiu: 'joao@email', passwordi: '123456' },
          }}>Almost there</Link>
        </TouchableOpacity>
        <Link href={'/confirm-forgot-password'}>Confirm Forgot Password</Link>
        <Link href={'/recovery-code'}>Recovery Code</Link>
        <Link href={'/searching-filters'}>Searching-filters</Link>
        <Link href={'/forgot-password'}>Forgot Password</Link>
        <Link href={'/home'}>Home</Link>
        <Link href={'/editing-perfil'}>Editing perfil</Link>
        <Link href={'/role-description'}>Role description</Link>
        <Link href={'/configs'}>Configs</Link>
        <Link href={'/privacy'}>Privacy</Link>
        <Link href={'/account'}>Account</Link>
        {/* View para testar os components */}
        <View className="my-5 w-full bg-[#121212]">
          {/* <RoleMainButton type='gradient' buttonFunction={teste} disabled={buttonDisabled}>
          <Text className='text-white text-base'>AAA</Text>
        </RoleMainButton> */}
          {/* <RoleCard data={'16 DEZ'} image={'https://placehold.co/600x400'} title={'São Conrado'} type={'Bar'} stars={4.5} local={'Itaim'} idRole={'1'}/> */}
          {/* <CategoryCard type='Musical' name='Pagode'/> */}
        </View>
        <TouchableOpacity onPress={clearAsync}>
          <Text>Limpar async</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
