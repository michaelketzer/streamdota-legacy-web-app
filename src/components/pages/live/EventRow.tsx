import { ReactElement } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { getDefaultHeader } from "../../../modules/middleware/Network";
import fetch from 'isomorphic-unfetch';
import HeroAvatar from "./HeroAvatar";
import StatsCount from "./StatsCount";

interface Props {
    id: number;
    heroClass: string;
    team: 'radiant' | 'dire';
    type: 'pick' | 'ban';
    leagueId: number;
}

interface HeroOverview {
    index: number;
    heroId: number;
    matchCount: number;
    matchWins: number;
    pickPhaseOne: number;
    pickPhaseTwo: number;
    pickPhaseThree: number;
    banCount: number;
    banPhaseOne: number;
    banPhaseTwo: number;
    banPhaseThree: number;
    totalGamesCount: number;
}

async function fetchHeroStats(abortController: AbortController, leagueId: number, heroId: number): Promise<HeroOverview | null> {
    const response = await fetch(process.env.API_URL + `/casting/heroStats/${leagueId}/${heroId}`, {headers: getDefaultHeader(), signal: abortController.signal});
    if(response.ok) {
        return await response.json();
    }

    return null;
}

export default function EventRow({leagueId, heroClass, id, team, type}: Props): ReactElement {
    const [stats] = useAbortFetch(fetchHeroStats, leagueId, id);

    const games = stats?.matchCount || 0;
    const totalGamesCount = stats?.totalGamesCount || 0;
    const winRate = games > 0 ? Math.floor(((stats?.matchWins || 0) * 100) / games) : 0;
    const banRate = totalGamesCount > 0 ? Math.floor(((stats?.banCount || 0) * 100) / totalGamesCount) : 0;
    const pickRate = totalGamesCount > 0 ? Math.floor((games * 100) / totalGamesCount) : 0;

    return <div className={'eventRow'}>
        <div className={'heroInfo'}>
            <div className={'avatar'}>
                <HeroAvatar heroClass={heroClass}/>
            </div>
            <div>
                <div className={'heroName'}>{heroClass}</div>
                <div className={'team'}>{team}</div>
                <div className={'type'}>{type}</div>
            </div>
        </div>

        <div className={'stats'}>
            {stats && <>
                <StatsCount label={'Games'}>{games}</StatsCount>
                <StatsCount label={'Pick rate'}>{pickRate}%</StatsCount>
                <StatsCount label={'Ban rate'}>{banRate}%</StatsCount>
                <StatsCount label={'Win rate'}>{winRate}%</StatsCount>
            </>}

            {!stats && <div className={'errorLoading'}>Unable to load stats.</div>}
        </div>

        <style>{`
            .eventRow {
                display: flex;
                align-items: stretch;
                justify-content: space-between;
                box-shadow: 2px 2px 20px 0 rgba(0,0,0,.1);
                height: 120px;
                padding: 10px 15px;
                margin-bottom: 30px;
            }

            .heroInfo {
                display: flex;
                align-items: center;
            }

            .stats {
                display: flex;
                height: 100%;
                align-items: stretch;
            }

            .avatar {
                height: 100px;
                margin-right: 15px;
            }

            .heroName {
                font-size: 20px;
                margin-bottom: 10px;
                font-weight: bold;
            }

            .team, .type {
                font-size: 16px;
                text-transform: uppercase;
            }

            .type {
                color: #1890FF;
            }

            .errorLoading {
                padding: 0 20px;
                color: #999;
            }
        `}</style>
    </div>;
}