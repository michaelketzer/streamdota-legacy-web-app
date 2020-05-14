import { ReactElement } from "react";
import { Typography } from "antd";
import Tags from "../../Commands/Tags";
import CommandList from "../bot/CommandList";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { Command } from "../../../api/@types/Command";
import { getCommands } from "../../../api/command";

export default function BotCommands(): ReactElement {
    const [commands, reload] = useAbortFetch<Command[]>(getCommands);
    const betCommand = commands && commands.find(({identifier}) => identifier === 'bet');
    
    return <>

        <div><Typography.Text strong>Variabeln</Typography.Text></div>
        <div><Typography.Text>Du kannst in den Antworten eines Commands folgende Variabeln benutzen:</Typography.Text></div>
        
        <Tags tags={['bet_command', 'winner', 'toplist_stats', 'user_bets_correct', 'user_bets_wrong', 'user_bets_total', 'user_bets_accuracy']} />

        <div><Typography.Text strong>Streamer Commands</Typography.Text></div>
        <CommandList commandType={'betting_streamer'} replaceVars={{BET_COMMAND: betCommand && betCommand.command}} onChange={reload} canCreate={false}/>

        <div style={{margin: '40px 0'}} />

        <div><Typography.Text strong>User Commands</Typography.Text></div>
        <CommandList commandType={'betting_user'} replaceVars={{BET_COMMAND: betCommand && betCommand.command}} onChange={reload} />
    </>;
}