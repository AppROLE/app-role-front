import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Animated, Pressable, Text, View } from "react-native";


interface AnimatedOptionProps {
  selected: boolean;
  label: string;
  onPress: () => void;
}

export default function AnimatedOption({ selected, label, onPress }: AnimatedOptionProps){
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: selected ? 1 : 0.8, // Mais opacidade quando selecionado
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={{ opacity }}>
        {selected ? (
          <LinearGradient
            colors={['#5A189A', '#9C4EDC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 30,
              borderRadius: 20,
              alignItems: 'center',
              shadowColor: 'rgba(156, 78, 220, 0.3)',
              shadowOffset: { width: 0, height: 7 },
              shadowOpacity: 1,
              shadowRadius: 11,
              elevation: 10,
            }}
          >
            <Text className="text-xs text-white">{label}</Text>
          </LinearGradient>
        ) : (
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 22,
              borderRadius: 20,
              backgroundColor: '#1C1C1C',
              alignItems: 'center',
            }}
          >
            <Text className="text-xs text-[#BDBDBD]">{label}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};