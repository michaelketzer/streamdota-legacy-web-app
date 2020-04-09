enum ACTIONS {
    NEW_MESSAGE = 'NEW_MESSAGE',
}

export enum MessageType {
    chat = 'chat',
    gamestate = 'gamestate',
    winner = 'winner',
}

export interface GameStateMessage {
    type: MessageType.gamestate;
    value: string;  
};

export interface WinnerMessage {
    type: MessageType.winner;
    value: boolean;
}

export interface ChatMessage {
    type: MessageType.chat;
    value: {
        user: string;
        message: string;
    };
}

export type Message =  GameStateMessage | WinnerMessage | ChatMessage;

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
        message,
        type: ACTIONS.NEW_MESSAGE,
    };
}