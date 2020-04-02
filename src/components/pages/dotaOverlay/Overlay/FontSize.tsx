import { ReactElement } from "react";
import { InputNumber } from "antd";

interface Props {
    fontSize: number;
    setFontSize: (size: number) => void;
}

export default function FontSize({fontSize, setFontSize}: Props): ReactElement {
    return <>
        <div><b>Schriftgröße</b></div>
        <InputNumber min={10} max={100} defaultValue={fontSize} onChange={setFontSize} />
    </>;
}