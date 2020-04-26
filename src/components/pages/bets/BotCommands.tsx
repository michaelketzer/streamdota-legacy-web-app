import { ReactElement } from "react";
import { Typography } from "antd";
import Tags from "../../Commands/Tags";
import CommandList from "../bot/CommandList";

export default function BotCommands(): ReactElement {
    return <>

        <div><Typography.Text strong>Variabeln</Typography.Text></div>
        <div><Typography.Text>Du kannst in den Antworten eines Commands folgende Variabeln benutzen:</Typography.Text></div>
        
        <Tags tags={['bet_command', 'winner', 'tooplist_stats', 'user_bets_correct', 'user_bets_wrong', 'user_bets_total', 'user_bets_accuracy']} />

        <div><Typography.Text strong>Streamer Commands</Typography.Text></div>
        <CommandList commandType={'betting_streamer'} />

        <div><Typography.Text strong>User Commands</Typography.Text></div>
        <CommandList commandType={'betting_user'} />
    </>;
}