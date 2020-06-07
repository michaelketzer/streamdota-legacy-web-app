import { ReactElement, useState, useEffect } from "react";
import { useMessageListener } from "../../../context/websocket/MessageHandler";
import { MessageType } from "../../../context/websocket/state";
import Overlay from "./Overlay";
import { useDotaStats } from "../../../../modules/selector/DotaOverlay";


export default function DotaStats({frameKey}: {frameKey: string}): ReactElement {
    const message = useMessageListener();
    const status = useDotaStats(frameKey);
    const [wins, setWins] = useState(0);
    const [lost, setLost] = useState(0);

    useEffect(() => {
        if(status) {
            let localWins = 0, localLost = 0;
            status.forEach(({won}) => {
                if(won) {
                    localWins++;
                } else {
                    localLost++;
                }
            });
            setWins(localWins + wins);
            setLost(localLost + lost);
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

    return <Overlay wins={wins} loss={lost} auth={frameKey} />;
}