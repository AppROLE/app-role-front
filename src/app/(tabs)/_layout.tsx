import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
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
          backgroundColor: '#1C1C1C',
          borderTopWidth: 2,
          borderTopColor: '#2C2B2B',
          height: 60,
          flexDirection: 'row',
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
                <FontAwesome6 name="house" size={24} color={`${focused ? '#9C4EDC' : '#FFFFFF'}`} />
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
                <MaterialCommunityIcons name="party-popper" size={28} color={`${focused ? '#9C4EDC' : '#FFFFFF'}`} />
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
                <FontAwesome6 name="heart" size={24} color={`${focused ? '#9C4EDC' : '#FFFFFF'}`} solid />
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
        </View>
          ),
        }}
      />
    </Tabs>
  );
}
