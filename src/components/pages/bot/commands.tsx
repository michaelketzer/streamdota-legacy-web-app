import { ReactElement } from "react";
import CommandList from "./CommandList";
import { Typography, Tag } from "antd";

export default function Commands(): ReactElement {
    return <>
        <div><Typography.Text strong>Variabeln</Typography.Text></div>
        <div><Typography.Text>Du kannst in den Antworten eines Commands folgende Variabeln benutzen:</Typography.Text></div>

        <div className={'variableTags'}>
            <Tag>{'{UPTIME}'}</Tag>
            <Tag>{'{USER}'}</Tag>
        </div>

        <div><Typography.Text strong>Commands</Typography.Text></div>
        <CommandList />

        <style jsx>{`
            .variableTags {
                display: flex;
                align-items: center;
                margin: 10px 0 32px;
                flex-wrap: wrap;
            }
        `}</style>
    </>;
}