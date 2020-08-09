import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import { Typography } from "antd";
import Color from "../../dotaOverlay/Overlay/Color";
import FontSize from "../../dotaOverlay/Overlay/FontSize";
import DistributionSlider from "./DistributionSlider";
import FrameLink from "../../dotaOverlay/Overlay/FrameLink";
import { useCurrentUser } from "../../../../hooks/currentUser";

export default function Distribution(): ReactElement {
    const overlay = useBetOverlay();
    const dispatch = useDispatch();
    const user = useCurrentUser();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div>
        <div className={'topGrid'}>
            <div>
                <Typography.Title level={3}>Farbe</Typography.Title>
                <Color label={'Hintergrund'} disableAlpha={false} value={overlay.distributionBackground} setValue={(distributionBackground) => patch({distributionBackground})}/>
                <Color label={'Schrift'} value={overlay.distributionFont} setValue={(distributionFont) => patch({distributionFont})}/>
                <Color label={'Team A'} value={overlay.distributionColorLeft} setValue={(distributionColorLeft) => patch({distributionColorLeft})}/>
                <Color label={'Team B'} value={overlay.distributionColorRight} setValue={(distributionColorRight) => patch({distributionColorRight})}/>
            </div>

            <div>
                <Typography.Title level={3}>Schrift</Typography.Title>

                <FontSize fontSize={overlay.distributionFontSize} setFontSize={(distributionFontSize) => patch({distributionFontSize})} />

                <br />
                <br />

                <FrameLink access={'betting/slider'} auth={user?.frameApiKey || ''} height={50} width={500} />
            </div>
        </div>

        <div className={'previewContainer'}>
            <Typography.Title level={3}>Vorschau</Typography.Title>
            <div className={'preview'}>
                <img className={'exampleBackground'} src={'/images/example_background.png'} />
                <div className={'slider'}><DistributionSlider overlay={overlay} /></div>
            </div>
        </div>

        <style jsx>{`
            .topGrid {
                display: grid;
                grid-template-columns: max-content max-content;
                grid-column-gap: 100px;
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