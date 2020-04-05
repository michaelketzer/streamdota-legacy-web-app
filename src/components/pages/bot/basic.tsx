import { ReactElement, useCallback } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchBotConfig, patchBotConfig } from "../../../api/user";
import { BotData } from "../../../api/@types/User";
import Loader from "../../Loader";
import { Switch } from "antd";

export default function Basic(): ReactElement {
    const config = useAbortFetch(fetchBotConfig);
    const patch = useCallback((data: Partial<BotData>) => patchBotConfig(data), []);

    if(config) {
        return <>
            <div><b>Channel Bot aktivieren</b></div>
            <Switch defaultChecked={Boolean(config.useBot)} onChange={(checked) => patch({useBot: checked})} />
        </>;
    }

    return <Loader />;
}