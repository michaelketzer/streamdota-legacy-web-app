import { ReactElement } from "react";
import { BetRoundData } from "../../../context/websocket/state";
import BetDistribution from "./BetDistribution";
import ChatParticipationTile from "./ChatParticipationTile";
import DetailsTile from "./DetailsTile";
import ParticipationTile from "./ParticipationTile";
import StatusTile from "./StatusTile";

export default function ActiveBet({betRound}: {betRound: BetRoundData}): ReactElement {
    return <div className={'container'}>
        <div className={'topRow'}>
            <div className={'stdTile'}>
                <StatusTile betRound={betRound} />
            </div>

            <div className={'stdTile'}>
                <ParticipationTile betRound={betRound} />
            </div>

            <div className={'stdTile'}>
                <ChatParticipationTile betRound={betRound} />
            </div>
        </div>

        <div className={'fullTile'}>
            <DetailsTile betRound={betRound} />
        </div>


        <style jsx>{`
            .container {
                margin-top: 30px;
            }

            .topRow {
                padding: 20px 10px;
                display: flex;
                justify-content: space-between;
            }

            .stdTile {
                max-width: 250px;
                width: 100%;
                margin: 0 35px 35px 0;
            }

            .stdTile:last-child {
                margin-right: 0;
            }

            .fullTile {
                width: 100%;
                padding: 35px;
            }
        `}</style>
    </div>;
}