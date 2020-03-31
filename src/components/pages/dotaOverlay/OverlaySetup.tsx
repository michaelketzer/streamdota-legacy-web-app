import { ReactElement, useMemo, useState, useEffect } from "react";
import FontSelector from "./Overlay/FontSelector";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchFonts } from "../../../api/googleFont";
import { Font } from "../../../api/@types/Font";
import FontVariantSelection from "./Overlay/FontVariantSelection";

export default function OverlaySetup(): ReactElement {
    const rawFonts = useAbortFetch<Font[]>(fetchFonts);
    const [font, setFont] = useState('Arial');
    const [variant, setVariant] = useState('400');

    useEffect(() => {
        if(rawFonts && font) {
            const {subSets} = rawFonts.find((f) => f.family === font);
            setVariant(subSets.includes('regular') ? 'regular' : (subSets.includes('400') ? '400' : subSets[0]));
        }
    }, [font]);

    return <>
        <h1>Overlay setup</h1>

        <div className={'setup'}>
            <div className={'col'}>
                <FontSelector rawFonts={rawFonts} selected={font} setSelected={(font) => setFont(font)}/>
                <FontVariantSelection rawFonts={rawFonts} font={font} variant={variant} setVariant={setVariant} />
            </div>

            <div className={'col'}>

            </div>
        </div>

        <style>{`
            .setup {
                margin: 20px -20px -20px -20px;
                display: flex;
            }

            .col {
                padding: 20px;
                width: 50%;
            }
        `}</style>
    </>;
}