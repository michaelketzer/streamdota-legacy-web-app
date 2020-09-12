import dayjs from 'dayjs';
import { BetRoundStats } from '@streamdota/shared-types';
import { DraftState } from '../../pages/live/Draft/Draft';

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
    gsi_gamedata = 'gsi_gamedata'
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

export type Message =  GameStateMessage | WinnerMessage | ChatMessage | BettingMessage | ConnectedMessage | RoshanMessage | DraftMessage | GameDetailsMessage;

export function isRoshanMessage(msg: Message): msg is RoshanMessage {
    return msg.type === MessageType.roshan;
}

export function isDraftMessage(msg: Message): msg is DraftMessage {
    return msg.type === MessageType.gsi_draft;
}

export function isGameDetailsMessage(msg: Message): msg is GameDetailsMessage {
    return msg.type === MessageType.gsi_gamedata;
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