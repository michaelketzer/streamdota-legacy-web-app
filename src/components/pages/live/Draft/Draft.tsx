import { ReactElement, useState, useEffect } from "react";
import DraftState from "./DraftState";
import { useMessageListener } from "../../../context/websocket/MessageHandler";
import { isDraftMessage } from "../../../context/websocket/state";
import DraftDetails from "./DraftDetails";

export interface TeamDraftState {
    pick0_id?: number;
    pick0_class?: string;
    pick1_id?: number;
    pick1_class?: string;
    pick2_id?: number;
    pick2_class?: string;
    pick3_id?: number;
    pick3_class?: string;
    pick4_id?: number;
    pick4_class?: string;
    ban0_id?: number;
    ban0_class?: string;
    ban1_id?: number;
    ban1_class?: string;
    ban2_id?: number;
    ban2_class?: string;
    ban3_id?: number;
    ban3_class?: string;
    ban4_id?: number;
    ban4_class?: string;
    ban5_id?: number;
    ban5_class?: string;
    ban6_id?: number;
    ban6_class?: string;
}

export interface DraftState {
    activeteam?: number;
    pick?: boolean;
    activeteam_time_remaining?: number;
    radiant_bonus_time?: number;
    dire_bonus_time?: number;
    team2?: TeamDraftState;
    team3?: TeamDraftState;
}

export default function Draft(): ReactElement | null {
    const [state, setState] = useState<DraftState | null>(null);
    const message = useMessageListener();
    useEffect(() => {
        if(message && isDraftMessage(message)) {
            setState(message.value);
        }
    }, [message])


    if(state) {
        return <>
            <DraftState state={state} />
            <DraftDetails state={state} />
        </>;
    }

    return null;
}