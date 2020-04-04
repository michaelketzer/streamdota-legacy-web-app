import { ReactElement, useMemo, useState } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { User } from "../../../api/@types/User";
import { fetchCurrentUser, fetchSteamConnections } from "../../../api/user";
import { SteamConnection } from "../../../api/@types/SteamConnection";
import Loader from "../../Loader";
import Configure from "./Configure";
import SetupGsi from "./SetupGsi";
import ContextProvider from "../../context/websocket/context";
import { initialState, reducer } from "../../context/websocket/state";
import Logs from "./Logs";

export enum OverlayMethods {
    dotaGsi,
    steam
}

export default function Configuration(): ReactElement {
    const user = useAbortFetch<User>(fetchCurrentUser);
    const steamConnections = useAbortFetch<SteamConnection[]>(fetchSteamConnections);
    const loading = useMemo(() => !user && !steamConnections, [user, steamConnections]);
    const [method, setMethod] = useState<OverlayMethods>(OverlayMethods.dotaGsi);

    if(loading) {
        return <Loader />;
    }

    return <>
        <Configure method={method} setMethod={setMethod}/>
        {method === OverlayMethods.dotaGsi && user && <>
            <SetupGsi gsiAuth={user && user.gsiAuth} />
            <ContextProvider initialState={initialState} reducer={reducer} url={'wss://api.streamdota.de/dota-gsi/logs/' + user.frameApiKey}>
                <Logs />
            </ContextProvider>
        </>}
        {method === OverlayMethods.steam && <h4>Diese Methode gibt es noch nicht</h4>}
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