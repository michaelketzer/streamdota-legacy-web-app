import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import Sub from "./Sub";
import SubTitle from "./SubTitle";
import ContentTitle from "./ContentTitle";
import Row from "./Row";
import Highlight from "./Highlight";
import i18nInstance, { TransFN } from "../../../../i18n";


const Betting = ({t}: {t: TransFN}): ReactElement => {
    return <Frame grey>
        <Title>{t('betting-header')}</Title>
        <SubTitle>{t('betting-header-sub')}</SubTitle>
        <Row>
            <img src={'/images/landingPreview/betsystem.jpg'} />
            <Sub>
                <ContentTitle>{t('features')}</ContentTitle>
                <ul>
                    <li><Highlight>{t('betting-seasons')}</Highlight> {t('betting-seasons-sub')}</li>
                    <li><Highlight>{t('betting-invites')}</Highlight> {t('betting-invites-sub')}</li>
                    <li><Highlight>{t('betting-control')}</Highlight> {t('betting-control-sub')}</li>
                    <li><Highlight>{t('betting-customizable')}</Highlight> {t('betting-customizable-sub')}</li>
                    <li><Highlight>{t('betting-automatic')}</Highlight> {t('betting-automatic-sub')}</li>
                </ul>
            </Sub>
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

export default i18nInstance.withTranslation('common')(Betting);