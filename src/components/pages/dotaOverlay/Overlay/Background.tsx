import { Switch, Radio } from "antd";
import { ReactElement } from "react";
import { DotaOverlay } from "../../../../api/@types/DotaOverlay";

export default function Background({cfg, patch}: {cfg: DotaOverlay, patch: (v: Partial<DotaOverlay>) => void}): ReactElement {
    return <>
        <div><b>Hintergrund</b></div>
        <Switch defaultChecked={Boolean(cfg.showBackground)} onChange={(checked) => patch({showBackground: checked})} />

        {cfg.showBackground && <>
            <br />  
            <br />  
            <div><b>Bündigkeit</b></div>
            <Radio.Group value={cfg.backgroundAlign} buttonStyle={'solid'} onChange={(e) => patch({backgroundAlign: e.target.value})}>
                <Radio.Button value={'left'}>Links</Radio.Button>
                <Radio.Button value={'center'}>Mittig</Radio.Button>
                <Radio.Button value={'right'}>Rechts</Radio.Button>
            </Radio.Group>
        </>}
        <br />
        <br />
    </>;
}