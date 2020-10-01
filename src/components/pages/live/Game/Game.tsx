import { ReactElement, useEffect, useState } from "react";
import { useMessageListener } from "../../../context/websocket/MessageHandler";
import { isGsiPlayerStateMessage } from "../../../context/websocket/state";
import GamePlayerState from "./Header/GamePlayerState";
import Overlay from "./Overlay/Overlay";

export interface PlayerState {
    steamId: string;
    heroId: number;
    kills: number;
    deaths: number;
    assists: number;
    last_hits: number;
    denies: number;
    gold: number;
    gold_reliable: number;
    gold_unreliable: number;
    gold_from_hero_kills: number;
    gold_from_creep_kills: number;
    gold_from_income: number;
    gold_from_shared: number;
    gpm: number;
    xpm: number;
    net_worth: number;
    hero_damage: number;
    runes_activated: number;
    camps_stacked: number;
    support_gold_spent: number;
    consumable_gold_spent: number;
    item_gold_spent: number;
    gold_lost_to_death: number;
    gold_spent_on_buybacks: number;
    level: number;
    alive: boolean;
    respawn_seconds: number;
    buyback_cost: number;
    buyback_cooldown: number;
    health_percent: number;
    mana_percent: number;
    smoked: boolean;
    canBuyBack: boolean;
}

export const heroIdMap = {
    '1': 'antimage',
    '2': 'axe',
    '3': 'bane',
    '4': 'bloodseeker',
    '5': 'crystal_maiden',
    '6': 'drow_ranger',
    '7': 'earthshaker',
    '8': 'juggernaut',
    '9': 'mirana',
    '10': 'morphling',
    '11': 'nevermore',
    '12': 'phantom_lancer',
    '13': 'puck',
    '14': 'pudge',
    '15': 'razor',
    '16': 'sand_king',
    '17': 'storm_spirit',
    '18': 'sven',
    '19': 'tiny',
    '20': 'vengefulspirit',
    '21': 'windrunner',
    '22': 'zuus',
    '23': 'kunkka',
    '25': 'lina',
    '26': 'lion',
    '27': 'shadow_shaman',
    '28': 'slardar',
    '29': 'tidehunter',
    '30': 'witch_doctor',
    '31': 'lich',
    '32': 'riki',
    '33': 'enigma',
    '34': 'tinker',
    '35': 'sniper',
    '36': 'necrolyte',
    '37': 'warlock',
    '38': 'beastmaster',
    '39': 'queenofpain',
    '40': 'venomancer',
    '41': 'faceless_void',
    '42': 'skeleton_king',
    '43': 'death_prophet',
    '44': 'phantom_assassin',
    '45': 'pugna',
    '46': 'templar_assassin',
    '47': 'viper',
    '48': 'luna',
    '49': 'dragon_knight',
    '50': 'dazzle',
    '51': 'rattletrap',
    '52': 'leshrac',
    '53': 'furion',
    '54': 'life_stealer',
    '55': 'dark_seer',
    '56': 'clinkz',
    '57': 'omniknight',
    '58': 'enchantress',
    '59': 'huskar',
    '60': 'night_stalker',
    '61': 'broodmother',
    '62': 'bounty_hunter',
    '63': 'weaver',
    '64': 'jakiro',
    '65': 'batrider',
    '66': 'chen',
    '67': 'spectre',
    '68': 'ancient_apparition',
    '69': 'doom_bringer',
    '70': 'ursa',
    '71': 'spirit_breaker',
    '72': 'gyrocopter',
    '73': 'alchemist',
    '74': 'invoker',
    '75': 'silencer',
    '76': 'obsidian_destroyer',
    '77': 'lycan',
    '78': 'brewmaster',
    '79': 'shadow_demon',
    '80': 'lone_druid',
    '81': 'chaos_knight',
    '82': 'meepo',
    '83': 'treant',
    '84': 'ogre_magi',
    '85': 'undying',
    '86': 'rubick',
    '87': 'disruptor',
    '88': 'nyx_assassin',
    '89': 'naga_siren',
    '90': 'keeper_of_the_light',
    '91': 'wisp',
    '92': 'visage',
    '93': 'slark',
    '94': 'medusa',
    '95': 'troll_warlord',
    '96': 'centaur',
    '97': 'magnataur',
    '98': 'shredder',
    '99': 'bristleback',
    '100': 'tusk',
    '101': 'skywrath_mage',
    '102': 'abaddon',
    '103': 'elder_titan',
    '104': 'legion_commander',
    '105': 'techies',
    '106': 'ember_spirit',
    '107': 'earth_spirit',
    '108': 'abyssal_underlord',
    '109': 'terrorblade',
    '110': 'phoenix',
    '111': 'oracle',
    '112': 'winter_wyvern',
    '113': 'arc_warden',
    '114': 'monkey_king',
    '119': 'dark_willow',
    '120': 'pangolier',
    '121': 'grimstroke',
    '126': 'void_spirit',
    '128': 'snapfire',
    '129': 'mars'
};

export default function Game(): ReactElement {
    const [playerState, setPlayerState] = useState([]);
    const message = useMessageListener();

    useEffect(() => {
        if(message && isGsiPlayerStateMessage(message)) {
            setPlayerState(message.value);
        }
    }, [message]);

    return <div className={'liveGameContainer'}>
        <GamePlayerState state={playerState || []} />

        <Overlay playerState={playerState}/>

        <style jsx>{`
            .liveGameContainer {
                min-height: 50vh;
            }    
        `}</style>
    </div>;
}