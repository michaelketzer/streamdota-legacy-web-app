import { ReactElement, useEffect, useState } from "react";
import Draggable from "./Draggable";
import { Alert } from "antd";
import { OverlayConfig } from "@streamdota/shared-types";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

const Position = ({t, cfg, patch}: {cfg: OverlayConfig; patch: (v: Partial<OverlayConfig>) => void} & WithTranslation): ReactElement => {

    return <>
        <div><b>{t('overlay-position')}</b></div>
        <Alert type='info' message={t('overlay-position-info')} />
        <div className={'positionFrame ' + (!cfg.showBackground && 'noBg')}>
            <div className={'container'}>
                <Draggable color={cfg.winColor} cfg={cfg} x={cfg.winX} y={cfg.winY} patch={(x, y) => patch({winX: x, winY: y})} height={'.9em'}>3</Draggable>
                <Draggable color={cfg.dividerColor} cfg={cfg} x={cfg.dividerX} y={cfg.dividerY} patch={(x, y) => patch({dividerX: x, dividerY: y})} height={'.7em'}>:</Draggable>
                <Draggable color={cfg.lossColor} cfg={cfg} x={cfg.lossX} y={cfg.lossY} patch={(x, y) => patch({lossX: x, lossY: y})} height={'.9em'}>1</Draggable>
            </div>
        </div>
        <style jsx>{`
            .positionFrame {
                margin-top: 10px;
                border: 1px solid #F0F;
                width: 60px;
                width: 160px;
                transform: scale(2);
                transform-origin-y: 0;
                margin: 20px auto 0 auto;
                background-image: url('/images/w-l-background.png');
                background-size: cover;
                height: 60px;
                margin-bottom: 80px;
            }

            .noBg {
                background: none;
            }

            .container {
                height: 58px;
                position: relative;
            }
        `}</style>
    </>;
}

export default i18nInstance.withTranslation('dotaWL')(Position);