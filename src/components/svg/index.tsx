import {ColorValue} from "react-native";
import React, {useState} from "react";
import {SvgXml, SvgProps} from "react-native-svg";

type SvgAddedProps = SvgProps & {
    uri: string;
    color?: ColorValue;
}

export default function Svg({uri, color, ...rest} : SvgAddedProps) {
    const [imgXml, setImgXml] = useState('<svg></svg>');

    const getImgXml = async () => {
        const xml = await (await fetch(uri)).text();
        const xmlFormat = color ? xml.replace(/stroke="white"/g, `stroke="${color.toString()}"`) : xml;
        setImgXml(xmlFormat);
    };

    getImgXml();

    return (
        <SvgXml
            xml={imgXml}
            {...rest}
        />
    )
}
