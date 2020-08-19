import { ReactElement } from "react";
import Frame from "./Frame";
import i18nInstance, { TransFN } from "../../../../i18n";


const Contact = ({t}: {t: TransFN}): ReactElement => {
    return <Frame blue>
        <div className={'getInTouch'}>
            {t('contact')}
            <a className={'discord'} href={'https://discord.gg/EYRQUaz'} target={'_blank'}>{t('joinDiscord')}</a>
        </div>

        <style jsx>{`
            .getInTouch {
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: space-evenly;
                font-size: 20px;
                flex-wrap: wrap;
            }

            .discord {
                border-radius: 4px;
                background-color: #7289da;
                cursor: pointer;
                height: 30px;;
                line-height: 30px;
                color: #FFF;
                font-size: 12px;
                font-weight: bold;
                padding: 0 10px;
            }
        `}</style>
    </Frame>;
}

export default i18nInstance.withTranslation('common')(Contact);