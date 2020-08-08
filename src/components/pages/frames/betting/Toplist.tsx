import React, { ReactElement } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import { useSelector } from "react-redux";
import { currentBetRoundSelector } from "../../../../modules/selector/BetRound";
import ToplistWrapper from "./ToplistWrapper";

interface Props {
    auth: string;
}

export default React.memo(function Toplist({auth}: Props): ReactElement | null {
    const overlay = useBetOverlay(auth);
    const currentBetRound = useSelector(currentBetRoundSelector);

    if(Object.keys(overlay).length > 0 && currentBetRound && currentBetRound.betSeason !== 0) {
        return <>
            <ToplistWrapper auth={auth} season={currentBetRound.betSeason} />
        </>;
    }

    return null;
})