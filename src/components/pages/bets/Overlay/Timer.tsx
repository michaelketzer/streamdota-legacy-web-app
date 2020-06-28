import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import { Typography } from "antd";
import Color from "../../dotaOverlay/Overlay/Color";
import FontSize from "../../dotaOverlay/Overlay/FontSize";
import TimerCounter from "./TimerCounter";

export default function Timer(): ReactElement {
    const overlay = useBetOverlay();
    const dispatch = useDispatch();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div>
        <div className={'topGrid'}>
            <div>
                <Typography.Title level={3}>Farbe</Typography.Title>
                <Color label={'Hintergrund'} disableAlpha={false} value={overlay.timerBackground} setValue={(timerBackground) => patch({timerBackground})}/>
                <Color label={'Schrift'} value={overlay.timerFont} setValue={(timerFont) => patch({timerFont})}/>
            </div>

            <div>
                <Typography.Title level={3}>Schrift</Typography.Title>

                <FontSize fontSize={overlay.timerFontSize} setFontSize={(timerFontSize) => patch({timerFontSize})} />

            </div>
        </div>

        <div className={'preview'}>
            <img className={'exampleBackground'} src={'/images/example_background.png'} />
            <div className={'timer'}><TimerCounter overlay={overlay} /></div>
        </div>

        <style jsx>{`
            .topGrid {
                display: grid;
                grid-template-columns: max-content max-content;
                grid-column-gap: 100px;
            }

            .preview {
                position: relative;
                min-width: 400px;
                padding: 20px;
                padding-top: 7rem;
                margin-top: 80px;
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