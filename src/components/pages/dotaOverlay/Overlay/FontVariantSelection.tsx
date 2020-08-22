import { ReactElement, useMemo, CSSProperties, useEffect } from "react";
import { Radio } from "antd";
import { Font } from "@streamdota/shared-types";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

export function getVariant(variant?: string): CSSProperties {
    if(variant) {
        return {
            //@ts-ignore
            fontWeight: variant.substring(0, 3), 
            fontStyle: variant.includes('italic') ? 'italic' : 'initial'
        };
    }

    return null;
}

interface Props extends WithTranslation {
    rawFonts: Font[];
    font: string;
    variant: string;
    setVariant: (variant: string) => void;
}

const subsetMap = {
    '100': 'font-100',
    '100italic': 'font-100italic',
    '200': 'font-200',
    '200italic': 'font-200italic',
    '300': 'font-300',
    '300italic': 'font-300italic',
    '400': 'font-400',
    'regular': 'font-400',
    '400italic': 'font-400italic',
    'italic': 'font-400italic',
    '500': 'font-500',
    '500italic': 'font-500italic',
    '600': 'font-600',
    '600italic': 'font-600italic',
    '700': 'font-700',
    '700italic': 'font-700italic',
    '800': 'font-800',
    '800italic': 'font-800italic',
    '900': 'font-900',
    '900italic': 'font-900italic',
};

const FontVariantSelection = ({t, rawFonts, font, variant, setVariant}: Props): ReactElement => {
    const {subSets} = useMemo<{subSets: string[]}>(() => (font && rawFonts && rawFonts.find((f) => f.family === font)) || {subSets: []}, [font, rawFonts]);
    const sorted = subSets.sort();

    useEffect(() => {
        if(!subSets.includes(variant)) {
            setVariant(subSets[0]);
        }
    }, [subSets]);

    return <div className={'gridSubSets'}>
        <div><b>{t('overlay-font-variant-label')}</b></div>
        <Radio.Group onChange={(e) => setVariant(e.target.value)} value={variant}>
            {sorted.map((s) =>  <Radio key={s} value={s}>
                <span style={{fontFamily: font, ...getVariant(s)}}>{t(subsetMap[s])}</span>
            </Radio>)}
        </Radio.Group>

        {sorted.length === 0 && <>{t('overlay-font-variant-noVariant')}</>}

        <style jsx>{`
            .gridSubSets {
                padding: 20px 0;
            }
        `}</style>
    </div>;
}

export default i18nInstance.withTranslation('dotaWL')(FontVariantSelection);