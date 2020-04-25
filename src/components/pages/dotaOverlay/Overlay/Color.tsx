import { ReactElement, useState, useEffect } from "react";
import { SketchPicker } from 'react-color';
import { Popover } from "antd";

interface Props {
    value: string;
    setValue: (v: string) => void;
    label: string;
}

export default function Color({value, setValue, label}: Props): ReactElement {
    const [update, setUpdate] = useState(value);

    useEffect(() => {
        setUpdate(value);
    }, [value]);

    return <div className={'color'}>
        <div className={'label'}><b>{label}</b></div>
        <Popover content={<SketchPicker disableAlpha color={value} onChangeComplete={({hex}) => setValue(hex)} onChange={({hex}) => setUpdate(hex)}/>} title="Wähle eine Farbe">
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
                padding: 20px 0;
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