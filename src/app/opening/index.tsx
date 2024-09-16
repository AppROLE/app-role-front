import { Dimensions, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import logo from '@/assets/images/logo-small.png'
import r from '@/assets/images/r.png'
import e from '@/assets/images/e.png'
import l from '@/assets/images/l.png'

import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

export default function Opening() {
  const { width } = Dimensions.get('window')

  const logoWidth = width / 2
  const geralHeight = logoWidth * 0.2864184008762322
  const logoSize = useSharedValue(geralHeight * 1.4)

  const translateLetersY = useSharedValue(geralHeight * 1.4)
  const translateOX = useSharedValue(width / 16)
  const [isLoading, setIsLoading] = React.useState(true)

  const letterOpacity = useSharedValue(0)

  function endLoadingAnimation() {
    translateOX.value = 0
    translateLetersY.value = 0
    logoSize.value = geralHeight
    letterOpacity.value = 1
  }

  useEffect(() => {
    logoSize.value = 60
    //simulação de carregamento
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000))
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
        endLoadingAnimation()
        setTimeout(() => {
          router.push('/first-page')
        }, 3000)
      }
    }
    loadData()
  }, [])

  const animatedStylesO = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateOX.value, {
          duration: 500,
          easing: Easing.inOut(Easing.quad)
        })
      }
    ],
    width: withTiming(logoSize.value, {
      duration: 500,
      easing: Easing.inOut(Easing.quad)
    }),
    height: withTiming(logoSize.value, {
      duration: 500,
      easing: Easing.inOut(Easing.quad)
    })
  }))

  const animatedStylesOLoading = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateOX.value, { duration: 0 }) }],
    width: withRepeat(withTiming(logoSize.value, { duration: 1000 }), -1, true),
    height: withRepeat(withTiming(logoSize.value, { duration: 1000 }), -1, true)
  }))

  const animatedBounce = (delay: number) => {
    return useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withDelay(
              delay,
              withSpring(translateLetersY.value, { damping: 7, stiffness: 100 })
            )
          }
        ],
        opacity: withTiming(letterOpacity.value, { duration: 200 })
      }
    })
  }

  return (
    <View className="flex-1 justify-center items-center " >
      <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={[
          '#DFA9FD',
          '#9C4EDC',
          '#5A189A',
          '#3C096C',
          '#240046',
          '#10002B'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className='flex flex-1 items-center justify-center'>
          <View className="flex flex-row">
            <Animated.Image
                source={r}
                resizeMode="contain"
                style={[
                  {
                    width: logoWidth * 0.2116648411829135,
                    height: geralHeight,
                    marginRight: logoWidth * 0.0350492880613363
                  },
                  animatedBounce(0)
                ]}
            />

            <Animated.Image
                source={logo}
                resizeMode="contain"
                style={[
                  { marginRight: logoWidth * 0.0553121577217963 },
                  isLoading ? animatedStylesOLoading : animatedStylesO
                ]}
            />

            <Animated.Image
                source={l}
                resizeMode="contain"
                style={[
                  {
                    width: logoWidth * 0.1782584884994524,
                    height: geralHeight,
                    marginRight: logoWidth * 0.0413472070098576
                  },
                  animatedBounce(100)
                ]}
            />

            <Animated.Image
                source={e}
                resizeMode="contain"
                style={[
                  { width: logoWidth * 0.1919496166484118, height: geralHeight },
                  animatedBounce(200)
                ]}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}
