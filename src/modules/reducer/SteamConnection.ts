import { SteamConnection } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { LOAD_STEAM_CONNECTIONS_REQUEST, LOAD_STEAM_CONNECTIONS_FAILURE, LOAD_STEAM_CONNECTIONS_SUCCESS } from './Actions';

export interface SteamConnectionState {
	[x: string]: SteamConnection;
}

export const steamConnection = new schema.Entity('steamConnection');

const { combinedReducer } = createReducer<SteamConnectionState>();
export const steamConnectionReducer = combinedReducer;

export function loadSteamConnections(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/user/steam`,
				schema: [ steamConnection ],
				types: {
					requestType: LOAD_STEAM_CONNECTIONS_REQUEST,
					successType: LOAD_STEAM_CONNECTIONS_SUCCESS,
					failureType: LOAD_STEAM_CONNECTIONS_FAILURE,
				},
			},
		});
	};
}
