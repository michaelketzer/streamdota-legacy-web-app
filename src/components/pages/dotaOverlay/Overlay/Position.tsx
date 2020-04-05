import { ReactElement, useEffect, useState } from "react";
import Draggable from "./Draggable";
import { Alert } from "antd";
import { DotaOverlay } from "../../../../api/@types/DotaOverlay";

export default function Position({cfg, patch}: {cfg: DotaOverlay; patch: (v: Partial<DotaOverlay>) => void}): ReactElement {

    return <>
        <div><b>Position</b></div>
        <Alert type='info' message='Zieh dir die Zahlen so wie du sie haben möchtest. Der Doppelpunkt ist leider in jeder Schriftart anders behandelt und sollte manuell mittig geschoben werden' />
        <div className={'positionFrame ' + cfg.backgroundAlign + ' ' + (!cfg.showBackground && 'noBg')}>
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
                background-image: url('/images/dotaOverlayBackground.png');
                background-size: cover;
                height: 60px;
                margin-bottom: 80px;
            }

            .positionFrame::before {
                display: none;
                position: absolute;
                background: url('/images/dotaOverlayBackground.png');
                content: " ";
                background-size: cover;
                top: 0;
                bottom: 0;
                left: -15px;
                width: 14px;
            }

            .left, .center {
                background-position: 100%;
            }

            .center::before {
                display: block;
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