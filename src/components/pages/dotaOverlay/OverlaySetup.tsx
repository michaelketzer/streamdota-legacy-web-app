import React, { ReactElement, useMemo, useState, useEffect, useCallback } from "react";
import FontSelector from "./Overlay/FontSelector";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchFonts } from "../../../api/googleFont";
import { Font } from "../../../api/@types/Font";
import FontVariantSelection from "./Overlay/FontVariantSelection";
import GoogleFontLoader from 'react-google-font-loader';
import FontSize from "./Overlay/FontSize";
import Color from "./Overlay/Color";
import Position from './Overlay/Position';
import Background from "./Overlay/Background";
import { DotaOverlay } from "../../../api/@types/DotaOverlay";
import { fetchOverlay, patchOverlay } from "../../../api/overlay";
import FrameLink from "./Overlay/FrameLink";
import { fetchCurrentUser } from "../../../api/user";
import { User } from "../../../api/@types/User";

function FontLoader({font, rawFonts}:{font: string; rawFonts: Font[]}  ): ReactElement | null {
    const fontConfig = useMemo(() => {
        if(rawFonts && font &&  font !== 'Arial') {
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

const defaultState: DotaOverlay = {
    font: 'Arial',
    fontSize: 50,
    variant: '400',
    winColor: '#0F0',
    dividerColor: '#D8D6D6',
    lossColor: '#F00',

    winX: 35,
    winY: 5,

    dividerX: 80,
    dividerY: 1,

    lossX: 107,
    lossY: 5,

    showBackground: true,
    backgroundAlign: 'right',
}

export default function OverlaySetup(): ReactElement {
    const [rawFonts] = useAbortFetch<Font[]>(fetchFonts);
    const [userCfg] = useAbortFetch<DotaOverlay>(fetchOverlay);
    const [userData] = useAbortFetch<User>(fetchCurrentUser);
    const [cfg, setCfg] = useState<DotaOverlay>(defaultState);

    useEffect(() => {
        userCfg && setCfg(userCfg)
    }, [userCfg]);

    const patch = (newCfg: Partial<DotaOverlay>) => {
        const config = {...cfg, ...newCfg};
        setCfg(config);
        patchOverlay(config);
    };

    return <>
        <h1>Overlay setup</h1>
        <FontLoaderFc font={cfg.font} rawFonts={rawFonts} />

        <div className={'setup'}>
            <div className={'col'}>
                <FontSelector rawFonts={rawFonts} selected={cfg.font} setSelected={(font) => patch({font})}/>
                <FontVariantSelection rawFonts={rawFonts} font={cfg.font} variant={cfg.variant} setVariant={(variant) => patch({variant})} />
                <FontSize fontSize={cfg.fontSize} setFontSize={(fontSize) => patch({fontSize})} />
                <br />
                <br />
                <Color value={cfg.winColor} setValue={(winColor) => patch({winColor})} label={'Farbe Gewonnen'} />
                <Color value={cfg.lossColor} setValue={(lossColor) => patch({lossColor})} label={'Farbe Verloren'} />
                <Color value={cfg.dividerColor} setValue={(dividerColor) => patch({dividerColor})} label={'Farbe Trenner'} />
            </div>

            <div className={'col'}>
                <Background cfg={cfg} patch={patch} />
                <Position cfg={cfg} patch={patch} />
                <FrameLink userData={userData} />
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