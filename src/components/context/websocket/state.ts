import dayjs from 'dayjs';
import { BetRoundStats } from '@streamdota/shared-types';
import { DraftState } from '../../pages/live/Draft/Draft';
import { PlayerState } from '../../pages/live/Game/Game';

enum ACTIONS {
    NEW_MESSAGE = 'NEW_MESSAGE',
}

export enum MessageType {
    chat = 'chat',
    gamestate = 'gamestate',
    connected = 'connected',
    winner = 'winner',
    betting = 'betting',
    roshan = 'roshan',
    draft = 'draft',
    draft2 = 'draft2',
    gsi_draft = 'gsi_draft',
    gsi_gamedata = 'gsi_gamedata',
    gsi_game_winner = 'gsi_game_winner',
    gsi_game_state = 'gsi_game_state',
    betting_v2 = 'betting_v2',
    gsi_players_state = 'gsi_players_state',
}

export interface BaseMessage {
    type: MessageType;
    date: number;
}

export interface GameStateMessage extends BaseMessage {
    type: MessageType.gamestate;
    value: string;  
};

export interface WinnerMessage extends BaseMessage {
    type: MessageType.winner;
    value: boolean;
}

export interface ChatMessage extends BaseMessage  {
    type: MessageType.chat;
    value: {
        user: string;
        message: string;
    };
}
export interface BettingMessage extends BaseMessage {
    type: MessageType.betting;
    value: BetRoundStats;
}
export interface ConnectedMessage extends BaseMessage {
    type: MessageType.connected;
    value: boolean;
}

export interface RoshanMessage extends BaseMessage {
    type: MessageType.roshan;
    value: {
        state: 'alive' | 'respawn_base' | 'respawn_variable';
        remaining: number;
    };
}

export interface DraftMessage extends BaseMessage {
    type: MessageType.gsi_draft;
    value: DraftState;
}

export enum GameState {
    playersLoading = 'DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD',
    heroSelection = 'DOTA_GAMERULES_STATE_HERO_SELECTION',
    strategyTime = 'DOTA_GAMERULES_STATE_STRATEGY_TIME',
    teamShowcase = 'DOTA_GAMERULES_STATE_TEAM_SHOWCASE',
    mapLoading = 'DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD',
    preGame = 'DOTA_GAMERULES_STATE_PRE_GAME',
    running = 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS',
    postGame = 'DOTA_GAMERULES_STATE_POST_GAME'
}
export interface GameDetailsMessage extends BaseMessage {
    type: MessageType.gsi_gamedata;
    value: {
        matchId: number;
        type: 'playing' | 'observing';
        gameState: GameState;
        paused: boolean;
        winner: string;
        radiantWinChance: number;
        radiant?: {
            name: string;
            logo: string;
        };
        dire?: {
            name: string;
            logo: string;
        };
    };
}

export interface GsiWinnerMessage extends BaseMessage {
    type: MessageType.gsi_game_winner;
    value: {
        isPlayingWin: boolean;
        winnerTeam: 'none' | 'radiant' | 'dire';
    };
}

export interface BetRoundData {
    status: 'stream_delay' | 'betting' | 'game_running' | 'finished';
    overlayVisibleUntil: number;
    overlayVisible: boolean;
    streamDelay: number;
    votingStartingAt: number;
    votingTimeRemaining: number;
    votingPossibleUntil: number;
    voteCreated: number;
    totalVotesCount: number;
    chatterCounts: number;
    teamACount: number;
    teamAVoters: string[];
    teamBCount: number;
    teamBVoters: string[];
    allVoters: string[];
    winner: null | string;
    winnerAnnouncement: null | number;
    announcedStart: boolean;
    announcedVoteEnd: boolean;
    announcedWinner: boolean;
}

export interface BettingV2Message extends BaseMessage {
    type: MessageType.betting_v2;
    value: BetRoundData;
}
export interface GsiGameStateMessage extends BaseMessage {
    type: MessageType.gsi_game_state;
    value: GameState;
}
export interface GsiPlayerStateMessage extends BaseMessage {
    type: MessageType.gsi_players_state;
    value: PlayerState[];
}

export type Message = GsiPlayerStateMessage | GsiGameStateMessage | BettingV2Message | GameStateMessage | GsiWinnerMessage | WinnerMessage | ChatMessage | BettingMessage | ConnectedMessage | RoshanMessage | DraftMessage | GameDetailsMessage;

export function isRoshanMessage(msg: Message): msg is RoshanMessage {
    return msg.type === MessageType.roshan;
}

export function isDraftMessage(msg: Message): msg is DraftMessage {
    return msg.type === MessageType.gsi_draft;
}

export function isGameDetailsMessage(msg: Message): msg is GameDetailsMessage {
    return msg.type === MessageType.gsi_gamedata;
}

export function isGsiWinnerMessage(msg: Message): msg is GsiWinnerMessage {
    return msg.type === MessageType.gsi_game_winner;
}

export function isBettingV2Message(msg: Message): msg is BettingV2Message {
    return msg.type === MessageType.betting_v2;
}

export function isGsiGameStateMessage(msg: Message): msg is GsiGameStateMessage {
    return msg.type === MessageType.gsi_game_state;
}

export function isGsiPlayerStateMessage(msg: Message): msg is GsiPlayerStateMessage {
    return msg.type === MessageType.gsi_players_state;
}

interface NewMessageAction {
    type: typeof ACTIONS.NEW_MESSAGE;
    message: Message;
}

export interface State {
    messages: Array<Message>;
}

export const initialState: State = {
    messages: [],
};

export const reducer = (state: State, action: NewMessageAction) => {
    switch (action.type) {
        case ACTIONS.NEW_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.message,
                ],
            };
        default:
            return state;
    }
};

export function newMessage(message: Message): NewMessageAction {
    return {
        message: {
            ...message,
            date: dayjs().unix(),
        },
        type: ACTIONS.NEW_MESSAGE,
    };
}