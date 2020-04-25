import { ReactElement, useMemo, useState } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { User } from "../../../api/@types/User";
import { fetchCurrentUser, fetchSteamConnections } from "../../../api/user";
import { SteamConnection } from "../../../api/@types/SteamConnection";
import Loader from "../../Loader";
import Configure from "./Configure";

export enum OverlayMethods {
    dotaGsi,
    steam
}

export default function Configuration(): ReactElement {
    const [user] = useAbortFetch<User>(fetchCurrentUser);
    const [steamConnections] = useAbortFetch<SteamConnection[]>(fetchSteamConnections);
    const loading = useMemo(() => !user && !steamConnections, [user, steamConnections]);
    const [method, setMethod] = useState<OverlayMethods>(OverlayMethods.dotaGsi);

    if(loading) {
        return <Loader />;
    }

    return <Configure method={method} setMethod={setMethod}/>;
}