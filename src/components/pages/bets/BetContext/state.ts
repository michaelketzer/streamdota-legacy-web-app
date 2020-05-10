enum ACTIONS {
    STATE_UPDATE = 'STATE_UPDATE',
}

export interface CurrentBetRound {
    id: string;
    status: 'betting' | 'running' | 'finished';
    created: number;
    result: string;
    bets: number;
    aBets: number;
    bBets: number;
    chatters: number;
}

interface UpdateAction {
    type: typeof ACTIONS.STATE_UPDATE;
    data: CurrentBetRound;
}

export type BetState  = CurrentBetRound;

export const betReducer = (state: BetState, action: UpdateAction) => {
    console.log('update state', action.type, action.data);
    switch (action.type) {
        case ACTIONS.STATE_UPDATE:
            return action.data;
        default:
            return state;
    }
};

export function updateState(state: BetState): UpdateAction {
    return {
        data: state,
        type: ACTIONS.STATE_UPDATE,
    };
}