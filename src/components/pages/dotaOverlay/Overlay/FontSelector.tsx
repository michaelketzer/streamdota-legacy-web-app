import { ReactElement, useMemo, useState } from "react";
import { Select, Alert } from 'antd';
import { Font } from "@streamdota/shared-types";

interface Props {
    rawFonts: Font[];
    selected: string;
    setSelected: (font: string) => void;
}

export default function FontSelector({rawFonts, selected, setSelected}: Props): ReactElement {
    const [search, setSearch] = useState('');
    const fonts = useMemo(() => {
        if(rawFonts) {
            return rawFonts.map(({family}) => ({value: family, label: family})).filter(({label}) => label.toLowerCase().includes(search.toLowerCase()));
        }
        return [];
    }, [rawFonts, search]);

    return <>
        <Alert message="Schriftart" type="info" description={<>
            Wähle eine Schriftart, um einen generellen Überblick über alle Schriften zu erhalten kannst du bei Google Fonts nachsehen: <a href="https://fonts.google.com/" target={'_blank'}>https://fonts.google.com/</a>
        </>} />

        <br />
    
        <div><b>Schrift</b></div>
        <Select 
            showSearch
            style={{width: '300px'}}
            options={fonts} 
            loading={fonts === null} 
            clearIcon 
            value={selected} 
            onChange={(value) => setSelected(value)}
            onSearch={setSearch}
        />
    </>;
}