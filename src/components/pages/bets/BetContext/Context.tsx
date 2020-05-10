import { createContext, ReactElement, useReducer, useContext, Dispatch, useEffect } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { fetchCurrentUser } from "../../../../api/user";
import Loader from "../../../Loader";
import ContextProvider, { useStateValue } from "../../../context/websocket/context";
import { initialState, reducer, MessageType } from "../../../context/websocket/state";
import { BetState, betReducer, updateState } from "./state";
import { fetchCurrentBetRound } from "../../../../api/bets";
import { useMessageListener } from "../../../context/websocket/MessageHandler";

const context = createContext({});
export const useBetState = (): [BetState, Dispatch<{}>] => useContext(context) as  [BetState, Dispatch<{}>];


const BetStateUpdated = () => {
    const message = useMessageListener();
    const [, dispatch] = useBetState();

    useEffect(() => {
        if(message && message.type === MessageType.betting) {
            dispatch(updateState(message.value));
        }
    }, [message]);
    
    return <></>;
};

const BetContextProvider = ({children, initialState}) => {

    return <context.Provider value={useReducer(betReducer, initialState)}>
        <BetStateUpdated />
        {children}
    </context.Provider>;
};

export default function BetContext({children}: {children: ReactElement}): ReactElement {
    const [user] = useAbortFetch(fetchCurrentUser);
    const [status] = useAbortFetch(fetchCurrentBetRound);

    if(user && status) {
        return <ContextProvider initialState={initialState} reducer={reducer} url={'ws://localhost/bets/live/' + (user && user.frameApiKey)}>
            <BetContextProvider initialState={status}>
                {children}
            </BetContextProvider>
        </ContextProvider>;
    }

    return <Loader />;
}
