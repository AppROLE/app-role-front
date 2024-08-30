import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import { Image, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          height: 60,
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: '', // Oculta o nome da aba
          tabBarIcon: ({ focused }) => (
            <View className='flex flex-col items-center gap-1'>
                <FontAwesome6 name="house" size={24} className={`${focused ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#5A189A] to-[#9C4EDC]' : 'text-white'}`} />
                {focused ? (
                  <View 
                    className='w-full h-[1.5px] bg-gradient-to-r from-[#5A189A] to-[#9C4EDC] rounded-full'
                    style={{
                      shadowColor: '#9C4EDC', // Cor da sombra
                      shadowOpacity: 1, // Opacidade da sombra
                      shadowRadius: 10, // Raio de desfoque da sombra
                      shadowOffset: { width: 0, height: 0 }, // Deslocamento da sombra
                    }}
                  ></View>
                ) : <></>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="packages/index"
        options={{
          tabBarLabel: '', // Oculta o nome da aba
          tabBarIcon: ({ focused }) => (
            <View>
                <FontAwesome6 name="gift" size={24} className={`${focused ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#5A189A] to-[#9C4EDC]' : 'text-white'}`} />
                {focused ? (
                  <View 
                    className='w-full h-[1.5px] bg-gradient-to-r from-[#5A189A] to-[#9C4EDC] rounded-full mt-[4px]'
                    style={{
                      shadowColor: '#9C4EDC', // Cor da sombra
                      shadowOpacity: 1, // Opacidade da sombra
                      shadowRadius: 10, // Raio de desfoque da sombra
                      shadowOffset: { width: 0, height: 0 }, // Deslocamento da sombra
                    }}
                  ></View>
                ) : <></>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites/index"
        options={{
          tabBarLabel: '', // Oculta o nome da aba
          tabBarIcon: ({ focused }) => (
            <View>
                <FontAwesome6 name="heart" size={24} className={`${focused ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#5A189A] to-[#9C4EDC]' : 'text-white'}`} solid/>
                {focused ? (
                  <View 
                    className='w-full h-[1.5px] bg-gradient-to-r from-[#5A189A] to-[#9C4EDC] rounded-full mt-[4px]'
                    style={{
                      shadowColor: '#9C4EDC', // Cor da sombra
                      shadowOpacity: 1, // Opacidade da sombra
                      shadowRadius: 10, // Raio de desfoque da sombra
                      shadowOffset: { width: 0, height: 0 }, // Deslocamento da sombra
                    }}
                  ></View>
                ) : <></>}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarLabel: '', // Oculta o nome da aba
          tabBarIcon: ({ focused }) => (
            <View>
            <LinearGradient
                colors={focused ? ['#5A189A', '#9C4EDC'] : ['#FFFFFF', '#FFFFFF']}
                style={{
                    borderRadius: 50,
                    padding: 2, // Ajuste para a espessura da borda
                }}
            >
                <View style={{
                    borderRadius: 50,
                    backgroundColor: 'white', // Cor do fundo
                    width: 28, // Largura total do contêiner
                    height: 28, // Altura total do contêiner
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image 
                        source={{ uri: 'https://placehold.co/600x400' }} 
                        style={{ width: 24, height: 24, borderRadius: 12 }} 
                    />
                </View>
            </LinearGradient>
            {focused ? (
              <View 
                className='w-full h-[1.5px] bg-gradient-to-r from-[#5A189A] to-[#9C4EDC] rounded-full mt-[4px]'
                style={{
                  shadowColor: '#9C4EDC', // Cor da sombra
                  shadowOpacity: 1, // Opacidade da sombra
                  shadowRadius: 10, // Raio de desfoque da sombra
                  shadowOffset: { width: 0, height: 0 }, // Deslocamento da sombra
                }}
              ></View>
            ) : <></>}
        </View>
          ),
        }}
      />
    </Tabs>
  );
}
