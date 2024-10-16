import React, { useState, useEffect } from "react";
import { SvgXml, SvgProps } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

type SvgAddedProps = SvgProps & {
    uri: string;
    width: number;
    height: number;
    empty?: boolean;
};

export function SvgGradient({ uri, width, height, empty, ...rest }: SvgAddedProps) {
    const [imgXml, setImgXml] = useState('<svg></svg>');

    useEffect(() => {
        const getImgXml = async () => {
            try {
                const response = await fetch(uri);
                const xml = await response.text();
                if (empty){
                    const xmlFormat = xml.replace(/path=".*?"/g, `path="none"`);
                    setImgXml(xmlFormat);
                }
                else{
                    const xmlFormat = xml.replace(/fill="none"/g, `fill="white"`);
                    setImgXml(xmlFormat);
                }
                
            } catch (error) {
                console.error("Error fetching SVG:", error);
            }
        };
        getImgXml();
    }, [uri]);

    return (
        <MaskedView
            maskElement={
                <SvgXml
                    width={width ? width : 24}
                    height={height ? height : 24}
                    xml={imgXml}
                    {...rest}
                />
            }
        >
            <LinearGradient
                style={{ height: height ? height : 24, width: width ? width : 24  }}
                colors={['#EBC8FF', '#C07EED']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
            > 
            </LinearGradient>
        </MaskedView>
    );
}
