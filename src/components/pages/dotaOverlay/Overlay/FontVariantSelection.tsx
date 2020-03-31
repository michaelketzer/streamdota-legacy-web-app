import { ReactElement, useMemo } from "react";
import { Font } from "../../../../api/@types/Font";

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

    return <div className={'gridSubSets'}>
        {subSets.map((s) => <label key={s} className={'checkbox'}>
            <input type={'radio'} value={s} name={'variant'} checked={s === variant} onClick={() => setVariant(s)}/>
            <div>{subsetMap[s]}</div>
        </label>)}

        <style jsx>{`
            .gridSubSets {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, .33fr));
                grid-gap: 10px;
                padding: 20px 0;
            }    

            .checkbox {
                display: grid;
                grid-template-columns: 20px 1fr;
                align-items: center;
            }
        `}</style>
    </div>;
}