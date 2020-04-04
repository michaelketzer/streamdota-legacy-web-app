import { ReactElement, ReactNode } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { fetchOverlayFromAuthKey } from "../../../../api/overlay";
import GoogleFontLoader from 'react-google-font-loader';
import { DotaOverlay } from "../../../../api/@types/DotaOverlay";
import { getVariant } from "../../dotaOverlay/Overlay/FontVariantSelection";

function Number({color, x, y, height, cfg, children}: {color: string, x: number, y:number, height: string, cfg: DotaOverlay, children: ReactNode}): ReactElement {
    return <div style={{
        color, 
        display: 'inline', 
        position: 'absolute', 
        top: y + 'px',
        left: x + 'px',
        fontSize: cfg.fontSize + 'px',
        lineHeight: height,
        fontFamily: cfg.font,
        ...getVariant(cfg.variant),
    }}>{children}</div>
}

export default function Overlay({wins, loss, auth}: {wins: number; loss: number; auth: string}): ReactElement | null  {
    const cfg = useAbortFetch(fetchOverlayFromAuthKey, auth);

    if(cfg) {
        return <>
            {cfg.font && cfg.font !== 'Arial' && <GoogleFontLoader fonts={[{font: cfg.font, weights: [cfg.variant]}]} />}
            <div className={'positionFrame ' + cfg.backgroundAlign + ' ' + (!cfg.showBackground && 'noBg')}>
                <div className={'container'}>
                    <Number color={cfg.winColor} cfg={cfg} x={cfg.winX} y={cfg.winY} height={'.9em'}>{wins}</Number>
                    <Number color={cfg.dividerColor} cfg={cfg} x={cfg.dividerX} y={cfg.dividerY} height={'.7em'}>:</Number>
                    <Number color={cfg.lossColor} cfg={cfg} x={cfg.lossX} y={cfg.lossY} height={'.9em'}>{loss}</Number>
                </div>
            </div>
            <style jsx>{`
                .positionFrame {
                    width: 160px;
                    background-image: url('/images/dotaOverlayBackground.png');
                    background-size: cover;
                    height: 60px;
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
                    width: 15px;
                }

                .left, .center {
                    background-position: 100%;
                }

                .center {
                    margin-left: 15px;
                    position: relative;
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

    return null;
}