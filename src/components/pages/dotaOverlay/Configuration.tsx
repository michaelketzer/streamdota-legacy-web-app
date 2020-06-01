import { ReactElement, useMemo, useState } from 'react';
import { useAbortFetch } from '../../../hooks/abortFetch';
import { fetchSteamConnections } from '../../../api/user';
import { SteamConnection } from '../../../api/@types/SteamConnection';
import Loader from '../../Loader';
import Configure from './Configure';
import { useCurrentUser } from '../../../hooks/currentUser';

export enum OverlayMethods {
	dotaGsi,
	steam,
}

export default function Configuration(): ReactElement {
	const user = useCurrentUser();
	const [ steamConnections ] = useAbortFetch<SteamConnection[]>(fetchSteamConnections);
	const loading = useMemo(() => !user && !steamConnections, [ user, steamConnections ]);
	const [ method, setMethod ] = useState<OverlayMethods>(OverlayMethods.dotaGsi);

	if (loading) {
		return <Loader />;
	}

	return <Configure method={method} setMethod={setMethod} />;
}
