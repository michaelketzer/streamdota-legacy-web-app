import { ReactElement } from "react";
import { BetOverlay } from "@streamdota/shared-types";
import GoogleFontLoader from "react-google-font-loader";
import { getVariant } from "../../dotaOverlay/Overlay/FontVariantSelection";

interface Props {
    overlay: BetOverlay;
}

export default function TimerCounter({overlay}: Props): ReactElement {
    return <div className={'wrapper'}>
        {overlay.fontFamily && <GoogleFontLoader fonts={[{font: overlay.fontFamily, weights: [overlay.fontVariant]}]} />}

        <div className={'counter'} style={{...getVariant(overlay.fontVariant)}}>1:20</div>

        <style jsx>{`
            .wrapper {
                background-color: ${overlay.timerBackground};
                font-size: ${overlay.timerFontSize}px;
                padding: .5em .75em;
                line-height: 1em;
            }

            .counter {
                font-family: ${overlay.fontFamily};
                color: ${overlay.timerFont};
            }
        `}</style>
    </div>;
}