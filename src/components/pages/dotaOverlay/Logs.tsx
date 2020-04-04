import { ReactElement } from "react";
import { useStateValue } from "../../context/websocket/context";

export default function Logs(): ReactElement {
    const [{messages}] = useStateValue();

    return <div className={'container'}>
        <h2>Live Log Einträge</h2>
        <div className={'logsContainer'}>
            {messages.map((msg, index) => <div key={index} className={'msg'}>{JSON.stringify(msg)}</div>)}
        </div>

        <style jsx>{`
            .container {
                padding: 20px;
            }
            
            .logsContainer {
                background: #000;
                color: #FFF;
                padding: 20px;
                min-height: 200px;
                border-radius: 8px;
                overflow-y: scroll;
            }

            .msg {
                font-family: monospace;
            } 
        `}</style>
    </div>;
}