import { ReactElement, useState, useEffect } from "react";
import { SketchPicker } from 'react-color';
import { Popover } from "antd";

interface Props {
    value: string;
    setValue: (v: string) => void;
    label: string;
    disableAlpha?: boolean;
}

interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}
function rgbToStr({r, g, b, a}: RGBA): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function Color({value, setValue, label, disableAlpha = true}: Props): ReactElement {
    const [update, setUpdate] = useState(value);

    useEffect(() => {
        setUpdate(value);
    }, [value]);

    return <div className={'color'}>
        <div className={'label'}><b>{label}</b></div>
        <Popover content={<SketchPicker disableAlpha={disableAlpha} color={value} onChangeComplete={({hex, rgb}) => setValue(disableAlpha ? hex : rgbToStr(rgb))} onChange={({hex, rgb}) => setUpdate(disableAlpha ? hex : rgbToStr(rgb))}/>} title="Wähle eine Farbe">
            <div className={'colorDot'} style={{backgroundColor: update}} />
        </Popover>
        <br />

        <style jsx>{`
            .colorDot {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                box-shadow: 1px 1px 4px 0px rgba(0,0,0,.6);
            }

            .color {
                display: flex;
                align-items: center;
                padding: 10px 0;
            }

            .label {
                width: 150px;
            }
        `}</style>

        <style jsx global>{`
            .sketch-picker {
                box-shadow: none!important;
            }
        `}</style>
    </div>;
}