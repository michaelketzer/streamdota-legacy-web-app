import { ReactElement, useMemo, useState } from 'react';
import Loader from '../../Loader';
import Configure from './Configure';
import { useCurrentUser } from '../../../hooks/currentUser';
import { useSteamConnection } from '../../../modules/selector/SteamConnection';

export enum OverlayMethods {
	dotaGsi,
	steam,
}

export default function Configuration(): ReactElement {
	const user = useCurrentUser();
	const steamConnections = useSteamConnection();
	const loading = useMemo(() => !user && !steamConnections, [ user, steamConnections ]);
	const [ method, setMethod ] = useState<OverlayMethods>(OverlayMethods.dotaGsi);

	if (loading) {
		return <Loader />;
	}

	return <Configure method={method} setMethod={setMethod} />;
}
