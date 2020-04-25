import { ReactElement } from "react";
import CommandList from "./CommandList";
import { Typography, Tag } from "antd";
import Tags from "../../Commands/Tags";

export default function Commands(): ReactElement {
    return <>
        <div><Typography.Text strong>Variabeln</Typography.Text></div>
        <div><Typography.Text>Du kannst in den Antworten eines Commands folgende Variabeln benutzen:</Typography.Text></div>

        <Tags tags={['uptime']} />

        <div><Typography.Text strong>Commands</Typography.Text></div>
        <CommandList />
    </>;
}