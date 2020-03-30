import { ReactElement, useState, useEffect } from "react";
import { useMessageListener } from "../../../context/websocket/MessageHandler";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { fetchStats } from "../../../../api/user";
import { MessageType } from "../../../context/websocket/state";


export default function DotaStats({frameKey}: {frameKey: string}): ReactElement {
    const message = useMessageListener();
    const status = useAbortFetch(fetchStats, frameKey);
    const [wins, setWins] = useState(0);
    const [lost, setLost] = useState(0);

    useEffect(() => {
        if(status) {
            status.forEach(({won}) => {
                if(won) {
                    setWins(wins + 1);
                } else {
                    setLost(lost + 1);
                }
            })
        }
    }, [status]);

    useEffect(() => {
        if(message && message.type === MessageType.winner) {
            if(message.value) {
                setWins(wins + 1);
            } else {
                setLost(lost + 1);
            }
        }
    }, [message])

    return <>
        {wins} - {lost} 
    </>;
}