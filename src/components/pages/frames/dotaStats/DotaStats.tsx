import { ReactElement } from "react";
import { useMessageListener } from "../../../context/websocket/MessageHandler";


export default function DotaStats(): ReactElement {
    const message = useMessageListener();

    return <>
        listening...
    </>;
}