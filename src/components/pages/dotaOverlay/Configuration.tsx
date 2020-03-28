import { ReactElement, useMemo } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { User } from "../../../api/@types/User";
import { fetchCurrentUser, fetchSteamConnections } from "../../../api/user";
import { SteamConnection } from "../../../api/@types/SteamConnection";
import Loader from "../../Loader";
import Configure from "./Configure";
import { downloadGsiConfig } from "../../../api/request";

export default function Configuration(): ReactElement {
    const user = useAbortFetch<User>(fetchCurrentUser);
    const steamConnections = useAbortFetch<SteamConnection[]>(fetchSteamConnections);

    const loading = useMemo(() => !user && !steamConnections, [user, steamConnections]);

    if(loading) {
        return <Loader />;
    }

    const onLoadGsi = async () => {
        await downloadGsiConfig();
    };

    return <>
        <Configure />

        <div  style={{margin: '20px 0'}}/>

        <div>
            Download and place file in your steam folder under the directory: <b>steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\</b>

            <div>A restart of dota is required!</div>
        </div>
        <p className={'downloadArea'}>
            <a className={'download'} onClick={onLoadGsi}>Generate dota-gsi config</a>
        </p>

        <style jsx>{`
            .downloadArea {
                padding: 20px 0;
                height: 40px;
            }    

            .download {
                padding: 10px 20px;
                border-radius: 4px;
                border: 1px solid #CCC;
                cursor: pointer;
            }
        `}</style>
    </>;
}