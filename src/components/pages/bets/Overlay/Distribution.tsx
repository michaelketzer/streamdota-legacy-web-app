import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import { Typography } from "antd";
import Color from "../../dotaOverlay/Overlay/Color";
import FontSize from "../../dotaOverlay/Overlay/FontSize";

export default function Distribution(): ReactElement {
    const overlay = useBetOverlay();
    const dispatch = useDispatch();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div className={'topGrid'}>
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

        </div>

        <style jsx>{`
            .topGrid {
                display: grid;
                grid-template-columns: max-content max-content;
                grid-column-gap: 100px;
            }
        `}</style>
    </div>
}