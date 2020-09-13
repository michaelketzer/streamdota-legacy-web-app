import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import { Typography, Alert, InputNumber, Switch } from "antd";
import Color from "../../dotaOverlay/Overlay/Color";
import FontSize from "../../dotaOverlay/Overlay/FontSize";
import DistributionSlider from "./DistributionSlider";
import FrameLink from "../../dotaOverlay/Overlay/FrameLink";
import { useCurrentUser } from "../../../../hooks/currentUser";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";

const Distribution = ({t}: WithTranslation): ReactElement => {
    const overlay = useBetOverlay();
    const dispatch = useDispatch();
    const user = useCurrentUser();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div>

        <div>
            <Alert
            message="Stream Delay"
            description={<div>
                {t('bet-season-stream-delay')}
                {t('bet-season-stream-delay-label')}&nbsp;&nbsp;
                <InputNumber min={0} value={user.streamDelay} onChange={(streamDelay) => dispatch(updateCurrentUser({streamDelay: +streamDelay}))} />
            </div>}
            type="warning"
            showIcon
            />
        </div>
        <div className={'topGrid'}>
            <div>
                <Typography.Title level={3}>{t('bet-season-overlay-color')}</Typography.Title>
                <Color label={t('bet-season-overlay-background')} disableAlpha={false} value={overlay.distributionBackground} setValue={(distributionBackground) => patch({distributionBackground})}/>
                <Color label={'Schrift'} value={overlay.distributionFont} setValue={(distributionFont) => patch({distributionFont})}/>
                <Color label={t('bet-season-overlay-teamA')} value={overlay.distributionColorLeft} setValue={(distributionColorLeft) => patch({distributionColorLeft})}/>
                <Color label={t('bet-season-overlay-teamB')} value={overlay.distributionColorRight} setValue={(distributionColorRight) => patch({distributionColorRight})}/>


                <Typography.Title level={3}>{t('bet-season-overlay-settings')}</Typography.Title>

                <div className={'settingsGrid'}>
                    <Switch checked={overlay.distributionNumbers} onChange={(distributionNumbers) => patch({distributionNumbers})} />
                    <div className={'label'} onClick={() => patch({distributionNumbers: !overlay.distributionNumbers})}>{t('bet-season-toplist-show-numbers')}</div>
                </div>
            </div>

            <div>
                <Typography.Title level={3}>{t('bet-season-overlay-font')}</Typography.Title>

                <FontSize fontSize={overlay.distributionFontSize} setFontSize={(distributionFontSize) => patch({distributionFontSize})} />

                <br />
                <br />

                <FrameLink access={'betting/slider'} auth={user?.frameApiKey || ''} height={50} width={1000} testing/>
            </div>
        </div>

        <div className={'previewContainer'}>
            <Typography.Title level={3}>{t('bet-season-overlay-preview')}</Typography.Title>
            <div className={'preview'}>
                <img className={'exampleBackground'} src={'/images/example_background.png'} />
                <div className={'slider'}><DistributionSlider overlay={overlay} delay={user.streamDelay} aBets={5} bBets={5} teamA={user.teamAName} teamB={user.teamBName}/></div>
            </div>
        </div>

        <style jsx>{`
            .topGrid {
                display: grid;
                grid-template-columns: max-content max-content;
                grid-column-gap: 100px;
                margin-top: 40px;
            }

            .settingsGrid {
                display: grid;
                grid-template-columns: max-content 1fr;
                grid-column-gap: 8px;
                grid-row-gap: 10px;
            }

            .preview {
                position: relative;
                min-width: 800px;
                padding: 20px;
                padding-top: 7rem;
            }

            .previewContainer {
                margin-top: 80px;
            }

            .exampleBackground {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                object-fit: cover;
                object-position: 50% 50%;
                width: 100%;
            }

            .slider {
                position: relative;
            }
        `}</style>
    </div>
}

export default i18nInstance.withTranslation('betSystem')(Distribution);