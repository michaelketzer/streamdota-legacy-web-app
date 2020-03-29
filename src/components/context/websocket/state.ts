enum ACTIONS {
    NEW_MESSAGE = 'NEW_MESSAGE',
}

enum MessageType {
    gamestate = 'gamestate',
    winner = 'winner',
}

export interface Message<T = MessageType.gamestate, V = string> {
    type: T;
    value: V;
}

export type GameStateMessage = Message<MessageType.gamestate>;
export type WinnerMessage = Message<MessageType.winner, boolean>;

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