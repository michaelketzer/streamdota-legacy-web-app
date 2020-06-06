import { Switch } from "antd";
import { ReactElement } from "react";
import { OverlayConfig } from '@streamdota/shared-types';

export default function Background({cfg, patch}: {cfg: OverlayConfig, patch: (v: Partial<OverlayConfig>) => void}): ReactElement {
    return <>
        <div><b>Hintergrund</b></div>
        <Switch defaultChecked={Boolean(cfg.showBackground)} onChange={(checked) => patch({showBackground: checked})} />
        <br />
        <br />
    </>;
}