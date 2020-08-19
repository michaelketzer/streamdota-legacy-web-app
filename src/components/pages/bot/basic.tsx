import { ReactElement } from "react";
import { Alert, Typography } from "antd";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../i18n";

const Basic = ({t}: WithTranslation): ReactElement => {
    return <div className={'wrapper'}>
        <Alert message={<>
            {t('info-mod-start')} <span style={{fontFamily: 'monospace'}}><Typography.Text code>/mod StreamDotaBot</Typography.Text></span> {t('info-mod-end')}
        </>} type={'warning'} />
        <br />
        <Alert message={<>
            {t('info-custom')} (<a href={'https://discordapp.com/channels/@me/148698273899610112/'}>GriefCode#1337</a>)
        </>} type={'info'} />

        <style jsx>{`
            .wrapper {
                max-width: 800px;
            }

            .inputGrid {
                display: grid;
                align-items: center;
                grid-template-columns: 1fr 1fr;
                grid-column-gap: 20px;
            }    
        `}</style>
    </div>;
}

export default i18nInstance.withTranslation('bot')(Basic);