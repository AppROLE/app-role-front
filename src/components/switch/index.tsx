import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwitchProps } from '@/interfaces/Switch';

const CustomToggleSwitch = ({ themeMode, onValueChange }: SwitchProps) => {
    const [tema, setTema] = useState(themeMode === 'dark');
    const animatedValue = useRef(new Animated.Value(tema ? 1 : 0)).current;

    useEffect(() => {
        setTema(themeMode === 'dark');
    }, [themeMode]);

    const toggleSwitch = () => {
        const newTheme = !tema ? 'dark' : 'light';
        setTema(!tema);
        onValueChange(newTheme === 'dark');
        StorageTheme(newTheme);
        
        Animated.timing(animatedValue, {
            toValue: !tema ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: tema ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [tema]);

    const interpolatedThumbPosition = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-16, 16], 
    });

    function StorageTheme(theme: 'dark' | 'light') {
        AsyncStorage.setItem('themeMode', theme);
    }

    return (
        <TouchableOpacity onPress={toggleSwitch}>
            <Animated.View style={[styles.container]}>
                <Animated.View style={[styles.thumb, { transform: [{ translateX: interpolatedThumbPosition }] }]} />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 65,
        height: 20,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        position: 'relative',
        backgroundColor: '#1C1C1C'
    },
    thumb: {
        width: 28,
        height: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        position: 'absolute',
        top: 5, 
    },
});

export default CustomToggleSwitch;