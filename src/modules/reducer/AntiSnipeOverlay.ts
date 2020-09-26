import { CALL_API, ActionDispatcher } from "../middleware/NetworkMiddlewareTypes";
import NetworkError from "../middleware/NetworkError";
import { LOAD_ANTI_SNIPE_OVERLAY_SUCCESS, LOAD_ANTI_SNIPE_OVERLAY_REQUEST, LOAD_ANTI_SNIPE_OVERLAY_FAILURE, UPDATE_ANTI_SNIPE_OVERLAY_REQUEST, UPDATE_ANTI_SNIPE_OVERLAY_SUCCESS, UPDATE_ANTI_SNIPE_OVERLAY_FAILURE } from "./Actions";
import { schema } from "normalizr";
import { createReducer } from "./util/Reducer";
import { AntiSnipeOverlay } from "@streamdota/shared-types";

export type AntiSnipeOverlayState = AntiSnipeOverlay;
export const overlay = new schema.Entity('antiSnipeOverlay');

interface AntiSnipeOverlayLoaded {
	type: typeof LOAD_ANTI_SNIPE_OVERLAY_SUCCESS;
	response: AntiSnipeOverlayState;
}

const { addReducer, combinedReducer } = createReducer<AntiSnipeOverlayState>();

addReducer<AntiSnipeOverlayLoaded>(LOAD_ANTI_SNIPE_OVERLAY_SUCCESS, (_state, {response}) => {
	return response;
});

export const antiSnipeOverlayReducer = combinedReducer;

export function loadAntiSnipeOverlay(frameApiKey?: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		const endpoint = frameApiKey ? `${process.env.API_URL}/antiSnipe?frameApiKey=${frameApiKey}` : `${process.env.API_URL}/antiSnipe`;
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
                endpoint,
				types: {
					requestType: LOAD_ANTI_SNIPE_OVERLAY_REQUEST,
					successType: LOAD_ANTI_SNIPE_OVERLAY_SUCCESS,
					failureType: LOAD_ANTI_SNIPE_OVERLAY_FAILURE,
                },
			},
		});
	};
}

export function patchAntiSnipe(data: Partial<AntiSnipeOverlay>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/antiSnipe`,
				method: 'patch',
				types: {
					requestType: UPDATE_ANTI_SNIPE_OVERLAY_REQUEST,
					successType: UPDATE_ANTI_SNIPE_OVERLAY_SUCCESS,
					failureType: UPDATE_ANTI_SNIPE_OVERLAY_FAILURE,
				},
				options: {
					data,
				}
			},
		});
	};
}