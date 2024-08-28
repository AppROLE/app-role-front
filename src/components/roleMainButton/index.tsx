import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface RoleMainButtonProps {
    type: string;
    children: ReactNode;
    buttonFunction?: () => void;
}

export default function RoleMainButton ({ children, buttonFunction, type }: RoleMainButtonProps) {
    return (
      <TouchableOpacity className="drop-shadow-2xl shadow-[#9C4EDC4D] text-white text-[16px]" onPress={buttonFunction}>
        {type === 'gradient' ? (
        <LinearGradient
          colors={['#5A189A', '#9C4EDC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} // Gradiente diagonal suave
          style={{ 
            paddingVertical: 12, 
            paddingHorizontal: 30, 
            borderRadius: 20, // Bordas arredondadas
            alignItems: 'center',

            shadowColor: 'rgba(156, 78, 220, 0.3)', // Cor da sombra
            shadowOffset: { width: 0, height: 7 }, // Deslocamento da sombra
            shadowOpacity: 1, // Opacidade da sombra
            shadowRadius: 11, // Raio de desfoque
            elevation: 10
          }}
        >
          {children}
        </LinearGradient>
        ) : (
          <View className="bg-[#1C1C1C] items-center flex flex-row gap-4 justify-center" style={{paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20}}>
            {children}
          </View>
        )}
      </TouchableOpacity>
    )
}