import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Row from "./Row";
import Sub from "./Sub";
import ContentTitle from "./ContentTitle";
import Highlight from "./Highlight";
import i18nInstance, { TransFN } from "../../../../i18n";


const LiveFeed = ({t}: {t: TransFN}): ReactElement => {
    return <Frame grey>
        <Title>{t('livefeed-header')}</Title>
        <SubTitle>{t('livefeed-header-sub')}</SubTitle>
        <Row>
            <img src={'/images/preview/liveFeed.png'} />
            <Sub>
                <ContentTitle>{t('features')}</ContentTitle>
                <ul>
                    <li><Highlight>{t('livefeed-league')}</Highlight> {t('livefeed-league-sub')}</li>
                    <li><Highlight>{t('livefeed-automatic')}</Highlight> {t('livefeed-automatic-sub')}</li>
                    <li><Highlight>{t('livefeed-overlay')}</Highlight> {t('livefeed-overlay-sub')}</li>
                </ul>
            </Sub>
        </Row>

        <style jsx>{`
            img {
                max-width: 200px;
                width: 100%;
                margin: 20px auto;
                border-radius: 8px;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.1);
            }
        `}</style>
    </Frame>;
}

export default i18nInstance.withTranslation('common')(LiveFeed)