import classNames from "classnames";
import { ReactElement, useEffect, useState } from "react";
import { useMessageListener } from "../../../../context/websocket/MessageHandler";
import { GameState, isGameDetailsMessage } from "../../../../context/websocket/state";
import Timer from "./Timer";

interface Props {
    bonus: number;
    active: boolean;
    time: number;
    team: 'radiant' | 'dire';
}

export default function TeamHeader({active, bonus, team, time}: Props): ReactElement {
    const [teamLogo, setTeamLogo] = useState(`/images/${team}_icon.png`);
    const [name, setName] = useState<string>(team);
    const [pickPhase, setPickPhase] = useState(true);
    const message = useMessageListener();

    useEffect(() => {
        if(message && isGameDetailsMessage(message)) {
            if(team === 'radiant' && message.value?.radiant) {
                setTeamLogo(message.value.radiant.logo);
                setName(message.value.radiant.name);
            } else if(team === 'dire' && message?.value?.dire) {
                setTeamLogo(message.value.dire.logo);
                setName(message.value.dire.name);
            } else if(! message.value) {
                setTeamLogo(`/images/${team}_icon.png`);
                setName(team);
            }
            setPickPhase(message.value?.gameState === GameState.heroSelection);
        }
    }, [message]);

    return  <div className={'header'}>
        <div className={'teamHeader'}>
            <div className={'teamLogo'}>
                <img src={teamLogo} alt={team + '_logo'} />
            </div>

            <div className={'teamName'}>
                {name}
            </div>
        </div>

        {pickPhase && <div>
            <div className={classNames('time', {active: time > 0})}><Timer time={time} defaultTime={30} active={active} /></div>
            <div className={classNames('time reserve', {active: time === 0})}><Timer time={bonus} active={active && time === 0} defaultTime={210} /></div>
        </div>}

        <style jsx>{`
            .header, .teamHeader {
                display: flex;
                align-items: center;
            }    

            .header {
                justify-content: space-between;
            }

            .teamLogo {
                margin-right: 15px;
                height: 50px;
                width: 50px;
            }

            .teamLogo img {
                height: 100%;
                width: 100%;
                object-fit: contain;
            }

            .teamName {
                text-transform: uppercase;
                font-weight: bold;
                font-size: 20px;
            }

            .time {
                font-size: 14px;
                line-height: 20px;
                transition: font-size 120ms ease-in-out;
                text-align: right;
            }

            .time.active {
                font-size: 20px;
            } 
        `}</style>
    </div>;
}