import { AntiSnipeOverlay } from "@streamdota/shared-types";
import { Radio, Typography } from "antd";
import { WithTranslation } from "next-i18next";
import { ReactElement } from "react";
import i18nInstance from "../../../i18n";

interface Props extends WithTranslation {
    type: AntiSnipeOverlay['type'];
    setType: (type: AntiSnipeOverlay['type']) => void;
}

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px',
};

const Type = ({setType, t, type}: Props): ReactElement => {
    return <>
        <div><b>{t('antiSnipe-type-title')}</b></div>
        <Radio.Group onChange={(e) => setType(e.target.value as AntiSnipeOverlay['type'])} value={type}>
            <Radio style={radioStyle} value={'normal'}>
                {t('overlay-type-normal')}
            </Radio>
            <Radio style={radioStyle} value={'rounded'}>
                {t('overlay-type-rounded')}
            </Radio>
        </Radio.Group>
    </>;
}

export default i18nInstance.withTranslation('antiSnipe')(Type);
