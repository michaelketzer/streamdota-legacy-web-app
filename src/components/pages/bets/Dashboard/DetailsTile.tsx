import { ReactElement } from "react";
import classNames from "classnames";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import { BetRoundData } from "../../../context/websocket/state";
import Tile from "./Tile/TileWrapper";
import BetDistribution from "./BetDistribution";
import { useCurrentUser } from "../../../../hooks/currentUser";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";

const DetailsTile = ({t, betRound}: {betRound: BetRoundData} & WithTranslation): ReactElement => {
    const user = useCurrentUser();
    const overlay = useBetOverlay();

    return <Tile>
        <div className={classNames('statusTileWrapper', betRound.status)}>
            <BetDistribution aBets={betRound.teamACount} bBets={betRound.teamBCount} bets={betRound.totalVotesCount} />
            <div className={'voters'}>
                <div className={'team'}>
                    <div className={'teamHeader'} style={{color: overlay.distributionColorLeft}}>Team {user.teamAName}</div>
                    {betRound.teamAVoters.map((name) => <div key={name}>{name}</div>)}
                </div>
                <div className={'team'}>
                    <div className={'teamHeader'} style={{color: overlay.distributionColorRight}}>Team {user.teamBName}</div>
                    {betRound.teamBVoters.map((name) => <div key={name}>{name}</div>)}
                </div>
            </div>
        </div>
        <style jsx>{`
            .statusTileWrapper {
                flex-grow: 1;
                min-height: 100px;
                padding: 10px 20px 40px 20px;
            }

            .voters {
                margin-top: 20px;
                display: flex;
                align-items: flex-start;
                justify-content: space-evenly;
                flex-wrap: wrap;
            }

            .teamHeader {
                font-weight: bold;
                font-size: 20px;
            }
        `}</style>
    </Tile>;
}

export default i18nInstance.withTranslation('betSystem')(DetailsTile);