import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import Sub from "./Sub";
import SubTitle from "./SubTitle";
import ContentTitle from "./ContentTitle";
import Row from "./Row";
import Highlight from "./Highlight";
import i18nInstance, { TransFN } from "../../../../i18n";


const StatsOverlay = ({t}: {t: TransFN}): ReactElement => {
    return <Frame id={'wl'}>
        <Title>{t('wl-header')}</Title>
        <SubTitle>{t('wl-header-sub')}</SubTitle>
        <Row>
            <Sub>
                <ContentTitle>{t('features')}</ContentTitle>
                <ul>
                    <li><Highlight>{t('wl-feature-automatic')}</Highlight> {t('wl-feature-automatic-sub')}</li>
                    <li><Highlight>{t('wl-feature-instant')}</Highlight> {t('wl-feature-instant-sub')}</li>
                    <li><Highlight>{t('wl-feature-customizable')}</Highlight> {t('wl-feature-customizable-sub')}</li>
                    <li><Highlight>{t('wl-feature-smart')}</Highlight> {t('wl-feature-smart-sub')}</li>
                </ul>
            </Sub>

            <img src={'/images/landingPreview/winLoss.jpg'} />
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

export default i18nInstance.withTranslation('common')(StatsOverlay);