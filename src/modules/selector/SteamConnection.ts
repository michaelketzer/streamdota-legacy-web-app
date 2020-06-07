import { State } from '../Store';
import { SteamConnection } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedSteamConnectionSelector } from './Ui';
import { SteamConnectionState, loadSteamConnections } from '../reducer/SteamConnection';

export const steamConnectionEntitiesSelector = (state: State): SteamConnectionState => state.entities.steamConnection;

export const steamConnectionsSelector = (state: State): SteamConnection[] | undefined =>
	state.entities.steamConnection ? Object.values(state.entities.steamConnection) : undefined;

export function useSteamConnection(): SteamConnection[] | undefined {
	const steamConnections = useSelector(steamConnectionsSelector);
	const loaded = useSelector(loadedSteamConnectionSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadSteamConnections());
			}
		},
		[ loaded ]
	);

	return steamConnections;
}
