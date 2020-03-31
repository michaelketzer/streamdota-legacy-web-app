import { ReactElement, useState, useMemo } from "react";
import Select from 'react-select';
import { Font } from "../../../../api/@types/Font";

interface Props {
    rawFonts: Font[];
    selected: string;
    setSelected: (font: string) => void;
}

export default function FontSelector({rawFonts, selected, setSelected}: Props): ReactElement {
    const fonts = useMemo(() => {
        if(rawFonts) {
            return rawFonts.map(({family}) => ({value: family, label: family}));
        }
        return [];
    }, [rawFonts]);

    return <Select options={fonts} isLoading={fonts === null} clearable defaultValue={selected} onChange={({value}) => setSelected(value)}/>;
}