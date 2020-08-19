import { Switch } from "antd";
import { ReactElement } from "react";
import { OverlayConfig } from '@streamdota/shared-types';
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

const Background = ({t, cfg, patch}: {cfg: OverlayConfig, patch: (v: Partial<OverlayConfig>) => void} & WithTranslation): ReactElement => {
    return <>
        <div><b>{t('overlay-background')}</b></div>
        <Switch defaultChecked={Boolean(cfg.showBackground)} onChange={(checked) => patch({showBackground: checked})} />
        <br />
        <br />
    </>;
}

export default i18nInstance.withTranslation('dotaWL')(Background);