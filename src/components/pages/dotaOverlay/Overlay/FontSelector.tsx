import { ReactElement, useMemo, useState } from "react";
import { Select, Alert } from 'antd';
import { Font } from "@streamdota/shared-types";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import FontSize from "./FontSize";

interface Props extends WithTranslation{
    rawFonts: Font[];
    selected: string;
    setSelected: (font: string) => void;
}

const FontSelector = ({t, rawFonts, selected, setSelected}: Props): ReactElement => {
    const [search, setSearch] = useState('');
    const fonts = useMemo(() => {
        if(rawFonts) {
            return rawFonts.map(({family}) => ({value: family, label: family})).filter(({label}) => label.toLowerCase().includes(search.toLowerCase()));
        }
        return [];
    }, [rawFonts, search]);

        return <>
        <div>
            <Alert message={t('overlay-font-label')} type="info" description={<>
                    {t('overlay-font-info')} <a href="https://fonts.google.com/" target={'_blank'}>https://fonts.google.com/</a>
                </>} />
            <br />
        </div>
    
        <div>
            <div><b>{t('overlay-font-label')}</b></div>
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
        </div>
    </>;
}

export default i18nInstance.withTranslation('dotaWL')(FontSelector);