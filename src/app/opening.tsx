import {Image, View, Text, ReactNode} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import React from "react";

interface OpeningProps {
    children?: React.ReactNode; // Type for children prop
}

export default function Opening({ children }: OpeningProps) {

    return (
        <View>
            <LinearGradient
                className="w-full h-full"
                colors={['#DFA9FD', '#9C4EDC', '#5A189A', '#3C096C', '#240046', '#10002B',]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
            >
                {children}
            </LinearGradient>
        </View>
    )
}
