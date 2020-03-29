import { ReactElement } from "react";
import { useMessageListener } from "../../../context/websocket/MessageHandler";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { fetchStats } from "../../../../api/user";


export default function DotaStats({frameKey}: {frameKey: string}): ReactElement {
    const message = useMessageListener();
    console.log(message);
    const status = useAbortFetch(fetchStats, frameKey);
    console.log(status);
    return <>
        listening...
    </>;
}