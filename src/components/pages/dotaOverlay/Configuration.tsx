import { ReactElement, useMemo } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { User } from "../../../api/@types/User";
import { fetchCurrentUser, fetchSteamConnections } from "../../../api/user";
import { SteamConnection } from "../../../api/@types/SteamConnection";
import Loader from "../../Loader";
import Configure from "./Configure";

export default function Configuration(): ReactElement {
    const user = useAbortFetch<User>(fetchCurrentUser);
    const steamConnections = useAbortFetch<SteamConnection[]>(fetchSteamConnections);

    const loading = useMemo(() => !user && !steamConnections, [user, steamConnections]);
    const hasData = useMemo(() => (user && user.gsiAuth) || (steamConnections && steamConnections.length > 0), [user, steamConnections]);

    if(loading) {
        return <Loader />;
    }

    if(!hasData) {
        return <Configure />;
    }

    return <>

    </>;
}