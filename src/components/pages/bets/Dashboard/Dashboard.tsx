import { ReactElement } from "react";
import { currentBetRoundSelector } from "../../../../modules/selector/BetRound";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import { useSelector } from "react-redux";
import AwaitingVote from "./AwaitingBet";
import ActiveBet from "./ActiveBet";

const Dashboard = ({t}: WithTranslation): ReactElement =>  {
    const betRound = useSelector(currentBetRoundSelector);
    
    console.log(betRound);

    return <div>
        {betRound === null && <AwaitingVote />}
        {betRound && <ActiveBet betRound={betRound} />}
    </div>;
}

export default i18nInstance.withTranslation('betSystem')(Dashboard);