import { ReactElement, useState, useEffect } from "react";
import DraftState from "./DraftState";
import { useMessageListener } from "../../../context/websocket/MessageHandler";
import { isDraftMessage, isDraft2Message } from "../../../context/websocket/state";

interface TeamDraftState {
    pick1_id: number;
    pick1_class: string;
    pick2_id: number;
    pick2_class: string;
    pick3_id: number;
    pick3_class: string;
    pick4_id: number;
    pick4_class: string;
    pick5_id: number;
    pick5_class: string;
    ban1_id: number;
    ban1_class: string;
    ban2_id: number;
    ban2_class: string;
    ban3_id: number;
    ban3_class: string;
    ban4_id: number;
    ban4_class: string;
    ban5_id: number;
    ban5_class: string;
    ban6_id: number;
    ban6_class: string;
}

export interface Draft2State {
    matchId: number;
    radiant: TeamDraftState;
    dire:TeamDraftState;
}

export default function Draft(): ReactElement {
    const [state, setState] = useState<Draft2State | null>(null);
    const message = useMessageListener();
    useEffect(() => {
        if(message && isDraft2Message(message)) {
            setState(message.value);
        }
    }, [message])


    return <>
        {state && <DraftState state={state}/>}
    </>;
}