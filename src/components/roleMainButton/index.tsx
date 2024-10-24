import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface RoleMainButtonProps {
    type: string;
    children: ReactNode;
    buttonFunction?: () => void;
    disabled?: boolean;
}

export default function RoleMainButton({ children, buttonFunction, type, disabled }: RoleMainButtonProps) {
    const [state, setState] = useState(disabled);

    function executeFunction() {
        if (disabled) return;
        if (buttonFunction) {
            buttonFunction();
        }
    }

    const gradientFollowingCollors = disabled ? null : ['#270754', '#613187']; // Cores normais do gradiente

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
            {type === 'gradient' && (
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
            ) 

            }
            {type === "following" && (
                <LinearGradient
                    colors={['rgb(49, 20, 75)', '#6a46cc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.1, y: 1 }}
                    style={{
                        shadowColor: 'rgba(156, 78, 220, 1)',
                        shadowOffset: { width: 0, height: 7 },
                        shadowOpacity: 0.3,
                        shadowRadius: 11,
                        elevation: 10,
                        borderRadius: 20,
                        width: '100%',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}
                >
                    <View className="w-full p-1">
                        <View className="bg-gray-600 rounded-full">
                            <LinearGradient
                                colors={gradientFollowingCollors}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1.4, y: 0 }}
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
                    </View>
                </LinearGradient>
            ) 
        
            }
            {type === "simple" && (
                <View 
                    className="bg-[#1C1C1C] items-center flex flex-row gap-4 justify-center" 
                    style={{paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20}}
                >
                    {children}
                </View>
            ) 
            }
            {type === "friends" && (
                <View 
                className="bg-['#0c5822'] border-2 border-green-500 items-center flex flex-row gap-4 justify-center" 
                style={{paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20}}
            >
                {children}
            </View> 
            )
            }

        </TouchableOpacity>
    );
}
