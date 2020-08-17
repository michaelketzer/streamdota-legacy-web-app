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

const heroNames = {
    abaddon: "Abaddon",
    abyssal_underlord: "Underlord",
    alchemist: "Alchemist",
    ancient_apparition: "Ancient Apparition",
    antimage: "Anti-Mage",
    arc_warden: "Arc Warden",
    axe: "Axe",
    bane: "Bane",
    batrider: "Batrider",
    beastmaster: "Beastmaster",
    bloodseeker: "Bloodseeker",
    bounty_hunter: "Bounty Hunter",
    brewmaster: "Brewmaster",
    bristleback: "Bristleback",
    broodmother: "Broodmother",
    centaur: "Centaur Warrunner",
    chaos_knight: "Chaos Knight",
    chen: "Chen",
    clinkz: "Clinkz",
    crystal_maiden: "Crystal Maiden",
    dark_seer: "Dark Seer",
    dark_willow: "Dark Willow",
    dazzle: "Dazzle",
    death_prophet: "Death Prophet",
    disruptor: "Disruptor",
    doom_bringer: "Doom",
    dragon_knight: "Dragon Knight",
    drow_ranger: "Drow Ranger",
    earth_spirit: "Earth Spirit",
    earthshaker: "Earthshaker",
    elder_titan: "Elder Titan",
    ember_spirit: "Ember Spirit",
    enchantress: "Enchantress",
    enigma: "Enigma",
    faceless_void: "Faceless Void",
    furion: "Nature's Prophet",
    grimstroke: "Grimstroke",
    gyrocopter: "Gyrocopter",
    huskar: "Huskar",
    invoker: "Invoker",
    jakiro: "Jakiro",
    juggernaut: "Juggernaut",
    keeper_of_the_light: "Keeper of the Light",
    kunkka: "Kunkka",
    legion_commander: "Legion Commander",
    leshrac: "Leshrac",
    lich: "Lich",
    life_stealer: "Lifestealer",
    lina: "Lina",
    lion: "Lion",
    lone_druid: "Lone Druid",
    luna: "Luna",
    lycan: "Lycan",
    magnataur: "Magnus",
    mars: "Mars",
    medusa: "Medusa",
    meepo: "Meepo",
    mirana: "Mirana",
    monkey_king: "Monkey King",
    morphling: "Morphling",
    naga_siren: "Naga Siren",
    necrolyte: "Necrophos",
    nevermore: "Shadow Fiend",
    night_stalker: "Night Stalker",
    nyx_assassin: "Nyx Assassin",
    obsidian_destroyer: "Outworld Devourer",
    ogre_magi: "Ogre Magi",
    omniknight: "Omniknight",
    oracle: "Oracle",
    pangolier: "Pangolier",
    phantom_assassin: "Phantom Assassin",
    phantom_lancer: "Phantom Lancer",
    phoenix: "Phoenix",
    puck: "Puck",
    pudge: "Pudge",
    pugna: "Pugna",
    queenofpain: "Queen of Pain",
    rattletrap: "Clockwerk",
    razor: "Razor",
    riki: "Riki",
    rubick: "Rubick",
    sand_king: "Sand King",
    shadow_demon: "Shadow Demon",
    shadow_shaman: "Shadow Shaman",
    shredder: "Timbersaw",
    silencer: "Silencer",
    skeleton_king: "Wraith King",
    skywrath_mage: "Skywrath Mage",
    slardar: "Slardar",
    slark: "Slark",
    snapfire: "Snapfire",
    sniper: "Sniper",
    spectre: "Spectre",
    spirit_breaker: "Spirit Breaker",
    storm_spirit: "Storm Spirit",
    sven: "Sven",
    techies: "Techies",
    templar_assassin: "Templar Assassin",
    terrorblade: "Terrorblade",
    tidehunter: "Tidehunter",
    tinker: "Tinker",
    tiny: "Tiny",
    treant: "Treant Protector",
    troll_warlord: "Troll Warlord",
    tusk: "Tusk",
    undying: "Undying",
    ursa: "Ursa",
    vengefulspirit: "Vengeful Spirit",
    venomancer: "Venomancer",
    viper: "Viper",
    visage: "Visage",
    void_spirit: "Void Spirit",
    warlock: "Warlock",
    weaver: "Weaver",
    windrunner: "Windranger",
    winter_wyvern: "Winter Wyvern",
    wisp: "Io",
    witch_doctor: "Witch Doctor",
    zuus: "Zeus",
};  

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
                <div className={'heroName'}>{heroNames[heroClass]}</div>
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