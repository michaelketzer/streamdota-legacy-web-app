import { ReactElement, useMemo, useRef, useEffect } from "react";
import { useStateValue } from "../../context/websocket/context";
import { ChatMessage, Message } from "../../context/websocket/state";
import dayjs from "dayjs";

function isChatMessage(message: Message): message is ChatMessage {
    return message.type === 'chat';
}

export default function Logs(): ReactElement {
    const [{messages}] = useStateValue();
    const ref = useRef<HTMLDivElement>();

    const messagesByType = useMemo(() => messages.filter(isChatMessage), [messages]);

    useEffect(() => {
        if(ref && ref.current) {
            ref.current.scrollTop = 1000000;
        }

    }, [ref, messagesByType])

    return <div className={'container'}>
        <h2>Live Log Einträge</h2>
        <div className={'logsContainer'} ref={ref}>
            {messagesByType.map(({date, value: {message, user}}, index) => <div key={index} className={'msg'}>
                <span>[{dayjs.unix(date).format('HH:mm')}]</span> <span>{user}</span>: <span>{message}</span>
            </div>)}
        </div>

        <style jsx>{`
            .container {
                margin: 20px 0;
            }
            
            .logsContainer {
                background: #000;
                color: #FFF;
                padding: 20px;
                min-height: 200px;
                border-radius: 8px;
                overflow-y: scroll;
                max-height: 200px;
            }

            .msg {
                font-family: monospace;
            } 
        `}</style>
    </div>;
}