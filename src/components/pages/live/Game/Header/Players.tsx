import classNames from "classnames";
import { ReactElement } from "react";
import HeroAvatar from "../../HeroAvatar";
import { heroIdMap, PlayerState } from "../Game";
import PlayerColor from "./PlayerColor";
import PlayerHealth from "./PlayerHealth";
import PlayerMana from "./PlayerMana";

interface Props {
    state: PlayerState[];
    dire?: boolean;
}


export default function Players({state, dire = false}: Props): ReactElement {
    return <>
        {state.map(({alive, canBuyBack, steamId, heroId, health_percent, mana_percent, respawn_seconds}, idx) => <div className={classNames('hero', {dire})} key={steamId}>
            <PlayerColor idx={idx + (dire ? 5 : 0)} />
            <div className={classNames('heroIcon', {alive, canBuyBack})}>
                <HeroAvatar heroClass={heroIdMap[heroId]} prefix={'h'}/>
            </div>
            {alive && <>
                <PlayerHealth health={health_percent} />
                <PlayerMana mana={mana_percent} />
            </>} 
            {!alive && <div className={'respawnTime'}>
                {respawn_seconds}
            </div>} 
        </div>)}

        <style jsx>{`
            .hero {
                transform: skew(10deg);
                width: 78px;
                overflow: hidden;
                margin-right: 2px;
                align-self: flex-start;
            }

            .hero.dire {
                transform: skew(-10deg);
            }

            .heroIcon {
                width: 120px;
                height: 40px;
                transform: skew(-10deg);
                margin-left: -15px;
            }  

            .heroIcon:not(.alive) {
                filter: grayscale(1);
            } 
            
            .heroIcon :global(img) {
                object-fit: cover!important;
            } 

            .respawnTime {
                background-color: rgba(0,0,0,0.2);
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                transform: skew(-10deg);
                font-size: 10px;
            }

            .respawnTime.canBuyBack {
                border-right: 1px solid #f5d907;
                border-left: 1px solid #f5d907;
            }

            .hero.dire .heroIcon, .hero.dire .respawnTime {
                transform: skew(10deg);
            }
        `}</style>
    </>;
}