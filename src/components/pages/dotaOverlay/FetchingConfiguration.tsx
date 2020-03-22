import { ReactElement, useState, useMemo } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { User } from "../../../api/@types/User";
import { fetchCurrentUser, fetchSteamConnections } from "../../../api/user";
import { SteamConnection } from "../../../api/@types/SteamConnection";

export default function FetchingConfiguration(): ReactElement {
    const user = useAbortFetch<User>(fetchCurrentUser);
    const steamConnections = useAbortFetch<SteamConnection[]>(fetchSteamConnections);

    const [loading, setLoading] = useState(false);
    const hasData = useMemo(() => (user && user.gsiAuth) || (steamConnections && steamConnections.length > 0), [user, steamConnections]);

    return <>

    </>;
}