import { ReactElement, useMemo, CSSProperties } from "react";
import { Font } from "../../../../api/@types/Font";
import { Radio } from "antd";

export function getVariant(variant: string): CSSProperties {
    return {
        //@ts-ignore
        fontWeight: variant.substring(0, 3), 
        fontStyle: variant.includes('italic') ? 'italic' : 'initial'
    };
}

interface Props {
    rawFonts: Font[];
    font: string;
    variant: string;
    setVariant: (variant: string) => void;
}

const subsetMap = {
    '100': 'Extra Dünn',
    '100italic': 'Extra Dünn Kursiv',
    '200': 'Dünn',
    '200italic': 'Dünn Kursiv',
    '300': 'Schmal',
    '300italic': 'Schmal Kursiv',
    '400': 'Regulär',
    'regular': 'Regulär',
    '400italic': 'Regulär Kursiv',
    'italic': 'Regulär Kursiv',
    '500': 'Mittelgroß',
    '500italic': 'Mittelgroß Kursiv',
    '600': 'Halbfett',
    '600italic': 'Halbfett Kursiv',
    '700': 'Fett',
    '700italic': 'Fett Kursiv',
    '800': 'Extra Fett',
    '800italic': 'Extra Fett Kursiv',
    '900': 'Schwarz',
    '900italic': 'Schwarz Kursiv',
};

export default function FontVariantSelection({rawFonts, font, variant, setVariant}: Props): ReactElement {
    const {subSets} = useMemo<{subSets: string[]}>(() => (font && rawFonts && rawFonts.find((f) => f.family === font)) || {subSets: []}, [font, rawFonts]);
    const sorted = subSets.sort();

    return <div className={'gridSubSets'}>
        <div><b>Schriftvariante</b></div>
        <Radio.Group onChange={(e) => setVariant(e.target.value)} value={variant}>
            {sorted.map((s) =>  <Radio key={s} value={s}>
                <span style={{fontFamily: font, ...getVariant(s)}}>{subsetMap[s]}</span>
            </Radio>)}
        </Radio.Group>

        {sorted.length === 0 && <>Die aktuelle Schrift hat keine Varianten</>}

        <style jsx>{`
            .gridSubSets {
                padding: 20px 0;
            }
        `}</style>
    </div>;
}