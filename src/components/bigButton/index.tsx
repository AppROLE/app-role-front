import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

interface RoleMainButtonProps {
    children: any;
    buttonFunction?: () => void;
    disabled?: boolean;
}

export default function BigButton ({children, buttonFunction, disabled }: RoleMainButtonProps) {
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
            disabled = {disabled}
            className="drop-shadow-2xl shadow-[#9C4EDC4D] text-white text-[16px] w-10/12 self-center p-0"
            onPress={executeFunction}
            activeOpacity={0.9}
        >
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    paddingVertical: 4,
                    borderRadius: 20,
                    alignItems: 'center',
                    shadowColor: 'rgba(156, 78, 220, 1)',
                    shadowOffset: { width: 0, height: 7 },
                    shadowOpacity: 1,
                    shadowRadius: 11,
                    elevation: 10,
                }}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
}
