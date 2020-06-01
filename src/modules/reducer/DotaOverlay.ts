import { OverlayConfig } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
	LOAD_DOTA_OVERLAY_FAILURE,
	LOAD_DOTA_OVERLAY_SUCCESS,
	LOAD_DOTA_OVERLAY_REQUEST,
	UPDATE_DOTA_OVERLAY_REQUEST,
	UPDATE_DOTA_OVERLAY_FAILURE,
	UPDATE_DOTA_OVERLAY_SUCCESS,
} from './Actions';

export type DotaOverlayState = OverlayConfig;

interface LoadDotaOverlay {
	response: OverlayConfig;
	type: typeof LOAD_DOTA_OVERLAY_SUCCESS;
}

const { addReducer, combinedReducer } = createReducer<DotaOverlayState>();

addReducer<LoadDotaOverlay>(LOAD_DOTA_OVERLAY_SUCCESS, (state, { response }) => ({ ...state, ...response }));

export const dotaOverlayReducer = combinedReducer;

export function loadDotaOverlay(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/overlay`,
				types: {
					requestType: LOAD_DOTA_OVERLAY_REQUEST,
					successType: LOAD_DOTA_OVERLAY_SUCCESS,
					failureType: LOAD_DOTA_OVERLAY_FAILURE,
				},
			},
		});
	};
}

export function updateDotaOverlay(data: Partial<OverlayConfig>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/overlay`,
				method: 'patch',
				types: {
					requestType: UPDATE_DOTA_OVERLAY_REQUEST,
					successType: UPDATE_DOTA_OVERLAY_SUCCESS,
					failureType: UPDATE_DOTA_OVERLAY_FAILURE,
				},
				options: {
					data: {
						...data,
					},
				},
			},
		});
		await dispatch(loadDotaOverlay());
	};
}
