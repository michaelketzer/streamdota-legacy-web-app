import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Row from "./Row";
import Sub from "./Sub";
import Highlight from "./Highlight";
import i18nInstance, { TransFN } from "../../../../i18n";


const Other = ({t}: {t: TransFN}): ReactElement => {
    return <Frame orange>
        <Title>{t('other-header')}</Title>
        <SubTitle>{t('other-header-sub')}</SubTitle>
        <Row>
            <Sub>
                <ul>
                    <li><Highlight>{t('other-free')}</Highlight> {t('other-free-sub')}</li>
                    <li><Highlight>{t('other-secure')}</Highlight> {t('other-secure-sub')}</li>
                    <li><Highlight>{t('other-openSource')}</Highlight> {t('other-openSource-sub')} <a href={'https://gitlab.com/streamdota'} target={'_blank'}>Gitlab</a></li>
                    <li><Highlight>{t('other-fast')}</Highlight> {t('other-fast-sub')}</li>
                    <li><Highlight>{t('other-openMinded')}</Highlight> {t('other-openMinded-sub')}</li>
                    <li><Highlight>{t('other-dota')}</Highlight> {t('other-dota-sub')}</li>
                </ul>
            </Sub>
            <img src={'/images/present_watermark.png'} />
        </Row>

        <style jsx>{`
            img {
                max-width: 200px;
                width: 100%;
                margin: 20px auto;
            }
        `}</style>
    </Frame>;
}

export default i18nInstance.withTranslation('common')(Other);