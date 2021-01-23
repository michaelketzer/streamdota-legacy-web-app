import { DotaStats as DotaStatsEntitiy } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { LOAD_DOTA_STATS_REQUEST, LOAD_DOTA_STATS_SUCCESS, LOAD_DOTA_STATS_FAILURE, REMOVE_DOTA_STATS_REQUEST, REMOVE_DOTA_STATS_SUCCESS, REMOVE_DOTA_STATS_FAILURE, REMOVE_ALL_DOTA_STATS_REQUEST, REMOVE_ALL_DOTA_STATS_FAILURE, REMOVE_ALL_DOTA_STATS_SUCCESS } from './Actions';

export interface DotaStatsState {
	[x: string]: DotaStatsEntitiy;
}

interface DeleteDotaStats {
	options: {
		urlParams: {
			timestamp: number;
		};
	};
	type: typeof REMOVE_DOTA_STATS_SUCCESS;
}

interface DeleteAllDotaStats {
	type: typeof REMOVE_ALL_DOTA_STATS_SUCCESS;
}

export const dotaStats = new schema.Entity('dotaStats', {}, {
	idAttribute: (item) => item.date
});

const { addReducer, combinedReducer } = createReducer<DotaStatsState>();

addReducer<DeleteDotaStats>(REMOVE_DOTA_STATS_SUCCESS, (state, { options: { urlParams: { timestamp } } }) => {
	const newState = { ...state };
	delete newState[timestamp];
	return newState;
});

addReducer<DeleteAllDotaStats>(REMOVE_ALL_DOTA_STATS_SUCCESS, () => ({}));

export const dotaStatsReducer = combinedReducer;

export function loadDotaStats(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/user/dotaStats`,
				schema: [ dotaStats ],
				types: {
					requestType: LOAD_DOTA_STATS_REQUEST,
					successType: LOAD_DOTA_STATS_SUCCESS,
					failureType: LOAD_DOTA_STATS_FAILURE,
				},
			},
		});
	};
}


export function removeGame(timestamp: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/user/dotaStats/:timestamp`,
				method: 'del',
				types: {
					requestType: REMOVE_DOTA_STATS_REQUEST,
					successType: REMOVE_DOTA_STATS_SUCCESS,
					failureType: REMOVE_DOTA_STATS_FAILURE,
				},
				options: {
					urlParams: {
						timestamp
					},
				},
			},
		});

		await dispatch(loadDotaStats());
	};
}

export function removeAllGames(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/user/dotaStats`,
				method: 'del',
				types: {
					requestType: REMOVE_ALL_DOTA_STATS_REQUEST,
					successType: REMOVE_ALL_DOTA_STATS_SUCCESS,
					failureType: REMOVE_ALL_DOTA_STATS_FAILURE,
				},
			},
		});

		await dispatch(loadDotaStats());
	};
}