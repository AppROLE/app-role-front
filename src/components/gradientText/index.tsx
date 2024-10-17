import React from "react";
import {Text, TextProps} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

export function GradientText({...props} : TextProps){
    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient
                style={{ flex: 1 }}
                colors={['#DFA9FD', '#9C4EDC']}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 1, y: 1 }}
            >
                <Text {...props} style={[props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};