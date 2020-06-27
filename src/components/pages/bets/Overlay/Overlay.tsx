import { ReactElement, useCallback } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useGoogleFont } from "../../../../modules/selector/GoogleFonts";
import FontSelector from "../../dotaOverlay/Overlay/FontSelector";
import { useDispatch } from "react-redux";
import { BetOverlay } from "@streamdota/shared-types";
import { patchBetOverlay } from "../../../../modules/reducer/BetOverlay";
import FontVariantSelection from "../../dotaOverlay/Overlay/FontVariantSelection";
import { Typography } from "antd";

export default function Overlay(): ReactElement {
    const overlay = useBetOverlay();
    const rawFonts = useGoogleFont();
    const dispatch = useDispatch();

    const patch = useCallback((data: Partial<BetOverlay>): void => {
        dispatch(patchBetOverlay(data));
    }, [dispatch]);
    
    return <div>
        <Typography.Title level={2}>Schrift</Typography.Title>
        <div className='fontSelection'>
            <FontSelector rawFonts={rawFonts} selected={overlay.fontFamily} setSelected={(fontFamily) => patch({fontFamily})}/>
        </div>
        
        <FontVariantSelection font={overlay.fontFamily} rawFonts={rawFonts} variant={overlay.fontVariant} setVariant={(fontVariant) => patch({fontVariant})} />


        <style jsx>{`
            .fontSelection {
                display: flex;
                flex-direction: row-reverse;
                justify-content: space-between;
            }
        `}</style>
    </div>
}