import { ReactElement } from "react";
import classNames from "classnames";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import { BetRoundData } from "../../../context/websocket/state";
import Tile from "./Tile/TileWrapper";
import StreamDelayInfo from "./StatusTile/StreamDelayInfo";
import Voting from "./StatusTile/Voting";
import GameRunning from "./StatusTile/GameRunning";

const StatusTile = ({t, betRound}: {betRound: BetRoundData} & WithTranslation): ReactElement => {

    return <Tile>
        <div className={classNames('statusTileWrapper', betRound.status)}>
            <div className={'inner'}>
                {betRound.status === "stream_delay" && <StreamDelayInfo betRound={betRound} />}
                {betRound.status === "betting" && <Voting betRound={betRound} />}
                {betRound.status === "game_running" && <GameRunning betRound={betRound} />}
            </div>
        </div>
        <style jsx>{`
            .statusTileWrapper {
                flex-grow: 1;
                min-height: 100px;
                padding: 10px 20px;
                padding: 10px 20px;
                display: flex;
                align-items: center;
                text-align: center;
            }

            .inner {
                flex-grow: 1;
                margin-top: -10px;
            }
        `}</style>
    </Tile>;
}

export default i18nInstance.withTranslation('betSystem')(StatusTile);