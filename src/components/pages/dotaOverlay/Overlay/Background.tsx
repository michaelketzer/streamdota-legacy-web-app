import { Switch, Radio } from "antd";
import { OverlayConfig } from "../OverlaySetup";
import { ReactElement } from "react";

export default function Background({cfg, patch}: {cfg: OverlayConfig, patch: (v: Partial<OverlayConfig>) => void}): ReactElement {
    return <>
        <div><b>Hintergrund</b></div>
        <Switch defaultChecked={cfg.showBackground} onChange={(checked) => patch({showBackground: checked})} />

        {cfg.showBackground && <>
            <br />  
            <br />  
            <div><b>Bündigkeit</b></div>
            <Radio.Group defaultValue={cfg.backgroundAlign} buttonStyle={'solid'} onChange={(e) => patch({backgroundAlign: e.target.value})}>
                <Radio.Button value={'left'}>Links</Radio.Button>
                <Radio.Button value={'center'}>Mittig</Radio.Button>
                <Radio.Button value={'right'}>Rechts</Radio.Button>
            </Radio.Group>
        </>}
        <br />
        <br />
    </>;
}