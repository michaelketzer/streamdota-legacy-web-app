import { ReactElement } from "react";
import { RoshOverlay } from "@streamdota/shared-types";
import classNames from "classnames";
import GoogleFontLoader from 'react-google-font-loader';
import { getVariant } from "../dotaOverlay/Overlay/FontVariantSelection";


interface Props {
    overlay: RoshOverlay;
}

export default function Timer({overlay}: Props): ReactElement {
    const minutes = 2;
    const seconds = 45;

    return <div className={classNames('timer', {state: 'respawn_base'})} style={{...getVariant(overlay.variant)}}>
        {overlay.font && overlay.font !== 'Arial' && <GoogleFontLoader fonts={[{font: overlay.font, weights: [overlay.variant]}]} />}
        {minutes}:{seconds}

        <style jsx global>{`
            body, html {
                margin: 0;
                padding: 0;
            }
        `}</style>

        <style jsx>{`
            .timer {
                line-height: 30px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: ${overlay.font};
                font-size: ${overlay.fontSize}px;
                color: ${overlay.baseColor};
            }

            .timer.respawn_variable {
                color: ${overlay.variableColor};
            }
        `}</style>
    </div>;
}