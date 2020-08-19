import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Row from "./Row";
import Sub from "./Sub";
import ContentTitle from "./ContentTitle";
import Highlight from "./Highlight";
import i18nInstance, { TransFN } from "../../../../i18n";


const RoshTimer = ({t}: {t: TransFN}): ReactElement => {
    return <Frame>
        <Title>{t('roshtimer-header')}</Title>
        <SubTitle>{t('roshtimer-header-sub')}</SubTitle>
        <Row>
            <Sub>
                <ContentTitle>{t('features')}</ContentTitle>
                <ul>
                    <li><Highlight>{t('roshtimer-aegis')}</Highlight> {t('roshtimer-aegis-sub')}</li>
                    <li><Highlight>{t('roshtimer-baseCountdown')}</Highlight> {t('roshtimer-baseCountdown-sub')}</li>
                    <li><Highlight>{t('roshtimer-variableCountdown')}</Highlight> {t('roshtimer-variableCountdown-sub')}</li>
                    <li><Highlight>{t('roshtimer-smart')}</Highlight> {t('roshtimer-smart-sub')}</li>
                </ul>
            </Sub>
            <img src={'/images/landingPreview/roshanTimer.jpg'} />
        </Row>

        <style jsx>{`
            img {
                margin: 20px auto;
                border-radius: 8px;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.1);
            }
        `}</style>
    </Frame>;
}

export default i18nInstance.withTranslation('common')(RoshTimer);