import { ReactElement, useState, useEffect } from "react";
import { useMessageListener } from "../../context/websocket/MessageHandler";
import { isDraftMessage } from "../../context/websocket/state";
import Draft from "./Draft/Draft";


interface Props {
    apiKey: string;
    leagueId: number;
}

interface Event {
    team: 'radiant' | 'dire';
    type: 'pick' | 'ban';
    id: number;
    class: string;
    matchId: number;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
        staggerChildren: 0.2
        }
    }
} 

const item = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 }
}

export default function LiveFeed(_props: Props): ReactElement {
    return <>
        <Draft />
    </>;
}