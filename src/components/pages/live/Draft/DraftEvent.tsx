import { ReactElement, useCallback, useState } from "react";
import classNames from "classnames";
import { EyeFilled } from "@ant-design/icons";
import HeroAvatar from "../HeroAvatar";
import {motion} from 'framer-motion';
import { fetchHeroStats } from "./TeamDraft/HeroStats";
import { getDefaultHeader, post } from "../../../../modules/middleware/Network";

interface Props {
    team: 'radiant' | 'dire';
    event: 'pick' | 'ban';
    idx?: number;
    heroId?: number;
    heroClass?: string;
}

const animations = {
    hidden: {scale: 0},
    visible: {scale: 1},
};

export default function DraftEvent({event, heroClass, heroId, team}: Props): ReactElement {
    const [disabled, setDisabled] = useState(false);
    const showHeroStats = useCallback(async () => {
        if(!disabled && heroId) {
            setDisabled(true);
            const abort = new AbortController();
            const data = await fetchHeroStats(abort, localStorage.getItem('leagueId'), heroId);
            await post(process.env.API_URL + '/casting/overlay', {data: {type: 'heroStats', heroId, heroClass, ...data}}, getDefaultHeader());
            setTimeout(() => setDisabled(false), 10000)
        }
    }, [heroId, disabled]);

    return <div className={classNames('draftEvent', team, event)}>
        <div className={'activeOverlay'} onClick={showHeroStats}>
            <EyeFilled style={{color: (heroId && !disabled) ? '#444' : '#EEE'}}/>
        </div>
        {heroClass && <motion.div initial={'hidden'} animate={'visible'} variants={animations}>
            <div className={'hero'}>
                <HeroAvatar heroClass={heroClass} prefix={'i'}/>
            </div>
        </motion.div>}
        

        <style jsx>{`
            .draftEvent {
                height: 4px;
                background-color: #CCC;
                width: 40px;
                margin: 0 2px;
                position: relative;
            }

            .pick.radiant {
                background-color: #4cae4e;
            }

            .pick.dire {
                background-color: #ef3d34;
            }

            .activeOverlay {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                right: 0;
                left: 0;
            }

            .radiant .activeOverlay {
                top: 6px;
            } 

            .dire .activeOverlay {
                bottom: 6px;
            } 

            .hero {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                right: 0;
                left: 0;
                padding: 0 6px;
            }

            .ban .hero {
                filter: grayscale(.8);
                opacity: .5;
            }

            .radiant .hero {
                bottom: 12px;
            } 

            .dire .hero {
                top: 12px;
            } 

            .draftEvent::before, .draftEvent::after {
                content: '';
                height: 0;
                width: 0;
                position: absolute;
                border-right: 5px solid transparent;
                border-left: 5px solid transparent;
                right: 50%;
                transform: translateX(50%);

            }

            .radiant::before {
                border-bottom: 5px solid #4cae4e;
                bottom: 4px;
            }

            .dire::after {
                top: 4px;
                border-top: 5px solid #ef3d34;
            }
        `}</style>
    </div>;
}
