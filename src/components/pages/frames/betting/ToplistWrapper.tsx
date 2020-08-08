import React, { ReactElement } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useSelector } from "react-redux";
import { currentBetRoundSelector } from "../../../../modules/selector/BetRound";
import { useBetSeasonToplist } from "../../../../modules/selector/BetSeasonToplist";
import ToplistOverlay from "../../bets/Overlay/ToplistOverlay";

interface Props {
    auth: string;
    season: number;
}

export default React.memo(function ToplistWrapper({auth, season}: Props): ReactElement | null {
    const overlay = useBetOverlay(auth);
    const currentBetRound = useSelector(currentBetRoundSelector);
    const toplist = useBetSeasonToplist(season, auth);

    if(Object.keys(overlay).length > 0) {
        return <>
            <ToplistOverlay overlay={overlay} list={toplist} />
        </>;
    }

    return null;
})