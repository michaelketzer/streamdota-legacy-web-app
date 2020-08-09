import React, { ReactElement, useMemo } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import DistributionSlider from "../../bets/Overlay/DistributionSlider";
import { useSelector } from "react-redux";
import { currentBetRoundSelector } from "../../../../modules/selector/BetRound";

interface Props {
    auth: string;
}

export default React.memo(function Slider({auth}: Props): ReactElement | null {
    const overlay = useBetOverlay(auth);
    const currentBetRound = useSelector(currentBetRoundSelector);

    const distribution = useMemo(() => {
        const {aBets, total} = currentBetRound || {aBets: 1, total: 2};

        if(total === 0) {
            return 50;
        }
        
        return (aBets * 100) / total;
    }, [currentBetRound]);

    if(Object.keys(overlay).length > 0 && currentBetRound.status === 'betting') {
        return <>
            <DistributionSlider overlay={overlay} distribution={distribution} />
        </>;
    }

    return null;
})