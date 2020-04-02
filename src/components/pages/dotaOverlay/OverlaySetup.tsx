import { ReactElement, useMemo, useState, useEffect } from "react";
import FontSelector from "./Overlay/FontSelector";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchFonts } from "../../../api/googleFont";
import { Font } from "../../../api/@types/Font";
import FontVariantSelection from "./Overlay/FontVariantSelection";
import GoogleFontLoader from 'react-google-font-loader';
import React from "react";
import FontSize from "./Overlay/FontSize";
import Color from "./Overlay/Color";

function FontLoader({font, rawFonts}:{font: string; rawFonts: Font[]}  ): ReactElement | null {
    const fontConfig = useMemo(() => {
        if(font &&  font !== 'Arial') {
            const data = rawFonts.find(({family}) => family === font);
            return {
                font: data.family,
                weights: data.subSets,
            }
        }
        return null;
    }, [font, rawFonts])

    if(fontConfig) {
        return <GoogleFontLoader fonts={[fontConfig]}/>;
    }

    return null;
}

const FontLoaderFc = React.memo(FontLoader);

export default function OverlaySetup(): ReactElement {
    const rawFonts = useAbortFetch<Font[]>(fetchFonts);
    const [font, setFont] = useState('Arial');
    const [fontSize, setFontSize] = useState(50);
    const [variant, setVariant] = useState('400');

    const [winColor, setWinColor] = useState('#0F0');
    const [dividerColor, setDivierColor] = useState('#444');
    const [lossColor, setLossColor] = useState('#F00');

    useEffect(() => {
        if(rawFonts && font) {
            const {subSets} = rawFonts.find((f) => f.family === font);
            setVariant(subSets.includes('regular') ? 'regular' : (subSets.includes('400') ? '400' : subSets[0]));
        }
    }, [font]);

    return <>
        <h1>Overlay setup</h1>
        <FontLoaderFc font={font} rawFonts={rawFonts} />

        <div className={'setup'}>
            <div className={'col'}>
                <FontSelector rawFonts={rawFonts} selected={font} setSelected={(font) => setFont(font)}/>
                <FontVariantSelection rawFonts={rawFonts} font={font} variant={variant} setVariant={setVariant} />
                <FontSize fontSize={fontSize} setFontSize={setFontSize} />
                <br />
                <br />
                <Color value={winColor} setValue={setWinColor} label={'Farbe Gewonnen'} />
                <Color value={lossColor} setValue={setLossColor} label={'Farbe Verloren'} />
                <Color value={dividerColor} setValue={setDivierColor} label={'Farbe Trenner ":"'} />
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