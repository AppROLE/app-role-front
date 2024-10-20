import {ColorValue} from "react-native";
import React, {useState} from "react";
import {SvgXml, SvgProps} from "react-native-svg";

type SvgAddedProps = SvgProps & {
    uri: string;
    color?: ColorValue;
    width?: number;
    height?: number;
}

export default function Svg({uri, color, width, height, ...rest} : SvgAddedProps) {
    const [imgXml, setImgXml] = useState('<svg></svg>');

    const getImgXml = async () => {
        const xml = await (await fetch(uri)).text();
        const xmlFormat = color 
        ? xml.replace(/stroke=".*?"/g, `stroke="${color.toString()}"`)
        : xml;
        setImgXml(xmlFormat);
        //.replace(/fill=".*?"/g, `fill="${color.toString()}"`)
    };


    getImgXml();

    return (
        <SvgXml
            width={width? width : 24}
            height={height? height : 24}
            xml={imgXml}
            {...rest}
        />
    )
}
