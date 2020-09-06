import dayjs from 'dayjs';
import { BetRoundStats } from '@streamdota/shared-types';
import { Draft2State } from '../../pages/live/Draft/Draft';

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
    type: MessageType.draft;
    value: {
        matchId: number;
        change: Array<{id: number; class: string}>;
        team: 'dire' | 'radiant';
        type: 'pick' | 'ban';
    };
}

export interface Draft2Message extends BaseMessage {
    type: MessageType.draft2;
    value: Draft2State;
}

export type Message =  GameStateMessage | WinnerMessage | ChatMessage | BettingMessage | ConnectedMessage | RoshanMessage | DraftMessage | Draft2Message;

export function isRoshanMessage(msg: Message): msg is RoshanMessage {
    return msg.type === MessageType.roshan;
}
export function isDraftMessage(msg: Message): msg is DraftMessage {
    return msg.type === MessageType.draft;
}

export function isDraft2Message(msg: Message): msg is Draft2Message {
    return msg.type === MessageType.draft2;
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