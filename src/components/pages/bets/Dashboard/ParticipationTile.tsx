import { ReactElement } from "react";
import classNames from "classnames";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import { BetRoundData } from "../../../context/websocket/state";
import Tile from "./Tile/TileWrapper";
import Value from "./Tile/Value";
import Label from "./Tile/Label";

const ParticipationTile = ({t, betRound}: {betRound: BetRoundData} & WithTranslation): ReactElement => {

    return <Tile>
        <div className={classNames('statusTileWrapper', betRound.status)}>
            <div className={'inner'}>
                <Value color={undefined}>{betRound.totalVotesCount}</Value>
                <Label>Teilnehmer</Label>
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

export default i18nInstance.withTranslation('betSystem')(ParticipationTile);