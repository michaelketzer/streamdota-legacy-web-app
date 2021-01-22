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

const stats = []; // [{"steamId":"76561198329182946","heroId":44,"kills":2,"deaths":0,"assists":0,"last_hits":66,"denies":5,"gold":670,"gold_reliable":167,"gold_unreliable":503,"gold_from_hero_kills":475,"gold_from_creep_kills":2042,"gold_from_income":1125,"gold_from_shared":68,"gpm":382,"xpm":344,"net_worth":4995,"hero_damage":2563,"runes_activated":1,"camps_stacked":1,"support_gold_spent":0,"consumable_gold_spent":330,"item_gold_spent":4235,"gold_lost_to_death":0,"gold_spent_on_buybacks":0,"level":8,"alive":true,"respawn_seconds":0,"buyback_cost":616,"buyback_cooldown":0,"health_percent":97,"mana_percent":45,"smoked":false,"canBuyBack":true},{"steamId":"76561198820680637","heroId":81,"kills":1,"deaths":1,"assists":2,"last_hits":50,"denies":2,"gold":715,"gold_reliable":206,"gold_unreliable":509,"gold_from_hero_kills":331,"gold_from_creep_kills":1948,"gold_from_income":1125,"gold_from_shared":171,"gpm":326,"xpm":357,"net_worth":4285,"hero_damage":4195,"runes_activated":2,"camps_stacked":0,"support_gold_spent":0,"consumable_gold_spent":390,"item_gold_spent":3290,"gold_lost_to_death":79,"gold_spent_on_buybacks":0,"level":8,"alive":true,"respawn_seconds":0,"buyback_cost":557,"buyback_cooldown":0,"health_percent":60,"mana_percent":41,"smoked":false,"canBuyBack":true},{"steamId":"76561198853401482","heroId":18,"kills":1,"deaths":4,"assists":3,"last_hits":13,"denies":4,"gold":56,"gold_reliable":56,"gold_unreliable":0,"gold_from_hero_kills":320,"gold_from_creep_kills":459,"gold_from_income":1125,"gold_from_shared":152,"gpm":199,"xpm":272,"net_worth":2336,"hero_damage":4940,"runes_activated":2,"camps_stacked":1,"support_gold_spent":150,"consumable_gold_spent":890,"item_gold_spent":1965,"gold_lost_to_death":106,"gold_spent_on_buybacks":0,"level":7,"alive":true,"respawn_seconds":0,"buyback_cost":394,"buyback_cooldown":0,"health_percent":100,"mana_percent":67,"smoked":false,"canBuyBack":false},{"steamId":"76561198059877305","heroId":121,"kills":1,"deaths":3,"assists":4,"last_hits":5,"denies":1,"gold":54,"gold_reliable":54,"gold_unreliable":0,"gold_from_hero_kills":415,"gold_from_creep_kills":77,"gold_from_income":1125,"gold_from_shared":255,"gpm":172,"xpm":245,"net_worth":1619,"hero_damage":4625,"runes_activated":4,"camps_stacked":1,"support_gold_spent":500,"consumable_gold_spent":1230,"item_gold_spent":1350,"gold_lost_to_death":18,"gold_spent_on_buybacks":0,"level":6,"alive":true,"respawn_seconds":0,"buyback_cost":334,"buyback_cooldown":0,"health_percent":100,"mana_percent":100,"smoked":false,"canBuyBack":false},{"steamId":"76561198258948978","heroId":76,"kills":3,"deaths":2,"assists":0,"last_hits":49,"denies":14,"gold":85,"gold_reliable":85,"gold_unreliable":0,"gold_from_hero_kills":763,"gold_from_creep_kills":1915,"gold_from_income":1125,"gold_from_shared":243,"gpm":353,"xpm":454,"net_worth":4375,"hero_damage":4716,"runes_activated":2,"camps_stacked":0,"support_gold_spent":0,"consumable_gold_spent":565,"item_gold_spent":4550,"gold_lost_to_death":116,"gold_spent_on_buybacks":0,"level":9,"alive":true,"respawn_seconds":0,"buyback_cost":564,"buyback_cooldown":0,"health_percent":93,"mana_percent":71,"smoked":false,"canBuyBack":false},{"steamId":"76561198152245502","heroId":88,"kills":1,"deaths":1,"assists":4,"last_hits":8,"denies":1,"gold":118,"gold_reliable":118,"gold_unreliable":0,"gold_from_hero_kills":393,"gold_from_creep_kills":293,"gold_from_income":1125,"gold_from_shared":173,"gpm":177,"xpm":313,"net_worth":2238,"hero_damage":2052,"runes_activated":1,"camps_stacked":0,"support_gold_spent":200,"consumable_gold_spent":690,"item_gold_spent":1880,"gold_lost_to_death":23,"gold_spent_on_buybacks":0,"level":7,"alive":true,"respawn_seconds":0,"buyback_cost":386,"buyback_cooldown":0,"health_percent":93,"mana_percent":76,"smoked":false,"canBuyBack":false},{"steamId":"76561198032578355","heroId":93,"kills":3,"deaths":0,"assists":2,"last_hits":79,"denies":8,"gold":842,"gold_reliable":165,"gold_unreliable":677,"gold_from_hero_kills":689,"gold_from_creep_kills":2617,"gold_from_income":1125,"gold_from_shared":209,"gpm":457,"xpm":526,"net_worth":5687,"hero_damage":4546,"runes_activated":0,"camps_stacked":1,"support_gold_spent":150,"consumable_gold_spent":530,"item_gold_spent":4655,"gold_lost_to_death":0,"gold_spent_on_buybacks":0,"level":10,"alive":true,"respawn_seconds":0,"buyback_cost":673,"buyback_cooldown":0,"health_percent":75,"mana_percent":82,"smoked":false,"canBuyBack":true},{"steamId":"76561198170319579","heroId":65,"kills":2,"deaths":2,"assists":2,"last_hits":87,"denies":1,"gold":678,"gold_reliable":271,"gold_unreliable":407,"gold_from_hero_kills":638,"gold_from_creep_kills":1718,"gold_from_income":1125,"gold_from_shared":310,"gpm":412,"xpm":477,"net_worth":5103,"hero_damage":5893,"runes_activated":3,"camps_stacked":1,"support_gold_spent":0,"consumable_gold_spent":570,"item_gold_spent":4235,"gold_lost_to_death":57,"gold_spent_on_buybacks":0,"level":10,"alive":true,"respawn_seconds":0,"buyback_cost":625,"buyback_cooldown":0,"health_percent":96,"mana_percent":67,"smoked":false,"canBuyBack":true},{"steamId":"76561198069224497","heroId":111,"kills":3,"deaths":2,"assists":3,"last_hits":13,"denies":6,"gold":281,"gold_reliable":106,"gold_unreliable":175,"gold_from_hero_kills":683,"gold_from_creep_kills":84,"gold_from_income":1125,"gold_from_shared":219,"gpm":231,"xpm":213,"net_worth":2396,"hero_damage":3495,"runes_activated":0,"camps_stacked":7,"support_gold_spent":575,"consumable_gold_spent":1435,"item_gold_spent":1775,"gold_lost_to_death":101,"gold_spent_on_buybacks":0,"level":6,"alive":true,"respawn_seconds":0,"buyback_cost":399,"buyback_cooldown":0,"health_percent":100,"mana_percent":100,"smoked":false,"canBuyBack":false},{"steamId":"76561198940745920","heroId":98,"kills":0,"deaths":3,"assists":2,"last_hits":73,"denies":6,"gold":602,"gold_reliable":325,"gold_unreliable":277,"gold_from_hero_kills":135,"gold_from_creep_kills":2949,"gold_from_income":1125,"gold_from_shared":67,"gpm":380,"xpm":450,"net_worth":4612,"hero_damage":6609,"runes_activated":1,"camps_stacked":0,"support_gold_spent":0,"consumable_gold_spent":630,"item_gold_spent":3970,"gold_lost_to_death":187,"gold_spent_on_buybacks":0,"level":9,"alive":true,"respawn_seconds":0,"buyback_cost":584,"buyback_cooldown":0,"health_percent":82,"mana_percent":91,"smoked":false,"canBuyBack":true}];

export default function Game(): ReactElement | null {
    const [playerState, setPlayerState] = useState(stats);
    const message = useMessageListener();

    useEffect(() => {
        if(message && isGsiPlayerStateMessage(message)) {
            //setPlayerState(message.value);
        }
    }, [message]);

    if(playerState.length > 0) {
        return <div className={'liveGameContainer'}>
            <GamePlayerState state={playerState || []} />

            <Overlay playerState={playerState}/>

            <style jsx>{`
                .liveGameContainer {
                    min-height: 50vh;
                    max-width: 1000px;
                    margin: 0 auto;
                }    
            `}</style>
        </div>;
    }

    return null;
}