import { Switch, Radio } from "antd";
import { ReactElement } from "react";
import { DotaOverlay } from "../../../../api/@types/DotaOverlay";

export default function Background({cfg, patch}: {cfg: DotaOverlay, patch: (v: Partial<DotaOverlay>) => void}): ReactElement {
    return <>
        <div><b>Hintergrund</b></div>
        <Switch defaultChecked={Boolean(cfg.showBackground)} onChange={(checked) => patch({showBackground: checked})} />
        <br />
        <br />
    </>;
}