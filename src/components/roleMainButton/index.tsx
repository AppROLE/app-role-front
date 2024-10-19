import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface RoleMainButtonProps {
    type: string;
    children: ReactNode;
    buttonFunction?: () => void;
    disabled?: boolean;
}

export default function RoleMainButton ({ children, buttonFunction, type, disabled }: RoleMainButtonProps) {
    const [state, setState] = useState(disabled);

    function executeFunction() {
        if (disabled) return;
        if (buttonFunction) {
            buttonFunction();
        }
    }

    const gradientColors = disabled 
        ? ['rgba(90, 24, 154, 0.25)', 'rgba(156, 78, 220, 0.25)'] // Cores do gradiente com brilho reduzido
        : ['#5A189A', '#9C4EDC']; // Cores normais do gradiente

    return (
        <TouchableOpacity 
            disabled={disabled} 
            className="drop-shadow-2xl shadow-[#9C4EDC4D] text-white text-[16px]" 
            onPress={executeFunction}
            activeOpacity={0.9}
        >
            {type === 'gradient' ? (
                <View 
                style={{ 
                    shadowColor: 'rgba(156, 78, 220, 1)', 
                    shadowOffset: { width: 0, height: 7 }, 
                    shadowOpacity: 0.3, 
                    shadowRadius: 11, 
                    elevation: 10, 
                    borderRadius: 20, 
                }}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ 
                        paddingVertical: 9, 
                        paddingHorizontal: 30, 
                        borderRadius: 20, 
                        alignItems: 'center',
                    }}
                >
                    {children}
                </LinearGradient>
            </View>
            ) : (
                <View 
                    className="bg-[#1C1C1C] items-center flex flex-row gap-4 justify-center" 
                    style={{paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20}}
                >
                    {children}
                </View>
            )}
        </TouchableOpacity>
    );
}
