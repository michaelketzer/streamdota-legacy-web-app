import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import { InputNumber, Typography } from "antd";
import Color from "../../dotaOverlay/Overlay/Color";
import FontSize from "../../dotaOverlay/Overlay/FontSize";
import TimerCounter from "./TimerCounter";
import FrameLink from "../../dotaOverlay/Overlay/FrameLink";
import { useCurrentUser } from "../../../../hooks/currentUser";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

const Timer = ({t}: WithTranslation): ReactElement => {
    const overlay = useBetOverlay();
    const user = useCurrentUser();
    const dispatch = useDispatch();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div>
        <div className={'topGrid'}>
            <div>
                <Typography.Title level={3}>{t('bet-season-overlay-color')}</Typography.Title>
                <Color label={t('bet-season-overlay-background')} disableAlpha={false} value={overlay.timerBackground} setValue={(timerBackground) => patch({timerBackground})}/>
                <Color label={t('bet-season-overlay-font')} value={overlay.timerFont} setValue={(timerFont) => patch({timerFont})}/>

                <br />
                <br />
                
                <Typography.Title level={3}>{t('bet-season-overlay-settings')}</Typography.Title>

                <div><b>{t('bet-season-timer-duration')}</b></div>
                <InputNumber min={0} max={600} value={overlay.timerDuration} onChange={(timerDuration) => patch({timerDuration: +timerDuration})} />
            </div>

            <div>
                <Typography.Title level={3}>{t('bet-season-overlay-font')}</Typography.Title>

                <FontSize fontSize={overlay.timerFontSize} setFontSize={(timerFontSize) => patch({timerFontSize})} />

                <br />
                <br />

                <FrameLink access={'betting/timer'} auth={user?.frameApiKey || ''} height={70} width={140} testing/>
            </div>
        </div>

        <div className={'previewContainer'}>
            <Typography.Title level={3}>{t('bet-season-overlay-preview')}</Typography.Title>
            <div className={'preview'}>
                <img className={'exampleBackground'} src={'/images/example_background.png'} />
                <div className={'timer'}><TimerCounter overlay={overlay} /></div>
            </div>
        </div>

        <style jsx>{`
            .topGrid {
                display: grid;
                grid-template-columns: max-content max-content;
                grid-column-gap: 100px;
            }

            .previewContainer {
                margin-top: 80px;
            }

            .preview {
                position: relative;
                min-width: 400px;
                padding: 20px;
                padding-top: 7rem;
            }

            .exampleBackground {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                object-fit: cover;
                object-position: 100%% 100%;
                width: 100%;
            }

            .timer {
                position: relative;
                display: flex;
            }
        `}</style>
    </div>
}

export default i18nInstance.withTranslation('betSystem')(Timer);