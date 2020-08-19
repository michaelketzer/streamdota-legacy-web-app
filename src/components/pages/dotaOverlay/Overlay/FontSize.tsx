import { ReactElement } from "react";
import { InputNumber } from "antd";
import i18nInstance from "../../../../i18n";
import { WithTranslation } from "next-i18next";

interface Props extends WithTranslation {
    fontSize: number;
    setFontSize: (size: number) => void;
}

const FontSize = ({t, fontSize, setFontSize}: Props): ReactElement => {
    return <>
        <div><b>{t('overlayfont-size')}</b></div>
        <InputNumber min={10} max={100} value={fontSize} onChange={setFontSize} />
    </>;
}

export default i18nInstance.withTranslation('dotaWL')(FontSize);