import { ReactElement, ReactNode } from "react";
import GoogleFontLoader from 'react-google-font-loader';
import { OverlayConfig } from "@streamdota/shared-types";
import { getVariant } from "../../dotaOverlay/Overlay/FontVariantSelection";
import { useDotaOverlay } from "../../../../modules/selector/DotaOverlay";

function Number({color, x, y, height, cfg, children}: {color: string, x: number, y:number, height: string, cfg: OverlayConfig, children: ReactNode}): ReactElement {
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
    const cfg = useDotaOverlay(auth);

    if(Object.keys(cfg).length > 0) {
        return <>
            {cfg.font && cfg.font !== 'Arial' && <GoogleFontLoader fonts={[{font: cfg.font, weights: [cfg.variant]}]} />}
            <div className={'positionFrame ' + (!cfg.showBackground && 'noBg')}>
                <div className={'container'}>
                    <Number color={cfg.winColor} cfg={cfg} x={cfg.winX} y={cfg.winY} height={'.9em'}>{wins}</Number>
                    <Number color={cfg.dividerColor} cfg={cfg} x={cfg.dividerX} y={cfg.dividerY} height={'.7em'}>:</Number>
                    <Number color={cfg.lossColor} cfg={cfg} x={cfg.lossX} y={cfg.lossY} height={'.9em'}>{loss}</Number>
                </div>
            </div>
            <style jsx>{`
                .positionFrame {
                    width: 160px;
                    background-image: url('/images/w-l-background.png');
                    background-size: cover;
                    height: 60px;
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