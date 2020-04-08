import { ReactElement, useCallback } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchBotConfig, patchBotConfig } from "../../../api/user";
import { BotData } from "../../../api/@types/User";
import Loader from "../../Loader";
import { Input } from "antd";
import CommandList from "./CommandList";

export default function Commands(): ReactElement {
    const [config] = useAbortFetch(fetchBotConfig);
    const patch = useCallback((data: Partial<BotData>) => patchBotConfig(data), []);

    if(config) {
        return <>
            <div><b>Command Trigger</b></div>
            <div className={'triggerInput'}>
                <Input defaultValue={config.commandTrigger} onBlur={(e) => patch({commandTrigger: e.target.value})} />
            </div>

            <br />
            <br />

            <CommandList />

            <style jsx>{`
                .triggerInput {
                    max-width: 50px;
                }    
            `}</style>
        </>;

    }
    return <Loader />;
}