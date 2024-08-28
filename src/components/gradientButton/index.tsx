import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Text } from "react-native";

interface GradientButtonProps {
    texto: string;
    buttonFunction?: () => void;
}

export default function GradientButton ({ texto, buttonFunction }: GradientButtonProps) {
    return (
      <TouchableOpacity className="drop-shadow-2xl shadow-[#9C4EDC4D]" onPress={buttonFunction}>
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
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }}>
            {texto}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
}