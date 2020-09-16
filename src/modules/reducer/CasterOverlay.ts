import { CALL_API, ActionDispatcher } from "../middleware/NetworkMiddlewareTypes";
import NetworkError from "../middleware/NetworkError";
import { LOAD_CASTER_OVERLAY_SUCCESS, LOAD_CASTER_OVERLAY_FAILURE, LOAD_CASTER_OVERLAY_REQUEST, UPDATE_CASTER_OVERLAY_REQUEST, UPDATE_CASTER_OVERLAY_SUCCESS, UPDATE_CASTER_OVERLAY_FAILURE } from "./Actions";
import { schema } from "normalizr";
import { createReducer } from "./util/Reducer";
import { CastingOverlay } from "@streamdota/shared-types";

export type CasterOverlayState = CastingOverlay;
export const casterOverlay = new schema.Entity('casterOverlay');

interface CasterOverlayLoaded {
	type: typeof LOAD_CASTER_OVERLAY_SUCCESS;
	response: CasterOverlayState;
}

const { addReducer, combinedReducer } = createReducer<CasterOverlayState>();

addReducer<CasterOverlayLoaded>(LOAD_CASTER_OVERLAY_SUCCESS, (_state, {response}) => {
	return response;
});

export const castingOverlayReducer = combinedReducer;

export function loadCastingOverlay(frameApiKey?: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		const endpoint = frameApiKey ? `${process.env.API_URL}/casting/settings?frameApiKey=${frameApiKey}` : `${process.env.API_URL}/casting/settings`;
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
                endpoint,
				types: {
					requestType: LOAD_CASTER_OVERLAY_REQUEST,
					successType: LOAD_CASTER_OVERLAY_SUCCESS,
					failureType: LOAD_CASTER_OVERLAY_FAILURE,
                },
			},
		});
	};
}

export function patchCastingOverlay(data: Partial<CastingOverlay>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/casting/settings`,
				method: 'patch',
				types: {
					requestType: UPDATE_CASTER_OVERLAY_REQUEST,
					successType: UPDATE_CASTER_OVERLAY_SUCCESS,
					failureType: UPDATE_CASTER_OVERLAY_FAILURE,
				},
				options: {
					data,
				}
			},
		});
	};
}