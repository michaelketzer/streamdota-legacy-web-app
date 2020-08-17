import { CALL_API, ActionDispatcher } from "../middleware/NetworkMiddlewareTypes";
import NetworkError from "../middleware/NetworkError";
import { LOAD_ROSH_OVERLAY_REQUEST, LOAD_ROSH_OVERLAY_SUCCESS, LOAD_ROSH_OVERLAY_FAILURE, UPDATE_ROSH_OVERLAY_REQUEST, UPDATE_ROSH_OVERLAY_SUCCESS, UPDATE_ROSH_OVERLAY_FAILURE } from "./Actions";
import { schema } from "normalizr";
import { createReducer } from "./util/Reducer";
import { RoshOverlay } from "@streamdota/shared-types";

export type RoshOverlayState = RoshOverlay;
export const betOverlay = new schema.Entity('roshOverlay');

interface RoshOverlayLoaded {
	type: typeof LOAD_ROSH_OVERLAY_SUCCESS;
	response: RoshOverlayState;
}

const { addReducer, combinedReducer } = createReducer<RoshOverlayState>();

addReducer<RoshOverlayLoaded>(LOAD_ROSH_OVERLAY_SUCCESS, (_state, {response}) => {
	return response;
});

export const roshOverlayReducer = combinedReducer;

export function loadRoshOverlay(frameApiKey?: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		const endpoint = frameApiKey ? `${process.env.API_URL}/roshTimer?frameApiKey=${frameApiKey}` : `${process.env.API_URL}/roshTimer`;
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
                endpoint,
				types: {
					requestType: LOAD_ROSH_OVERLAY_REQUEST,
					successType: LOAD_ROSH_OVERLAY_SUCCESS,
					failureType: LOAD_ROSH_OVERLAY_FAILURE,
                },
			},
		});
	};
}

export function patchRoshOverlay(data: Partial<RoshOverlay>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/roshTimer`,
				method: 'patch',
				types: {
					requestType: UPDATE_ROSH_OVERLAY_REQUEST,
					successType: UPDATE_ROSH_OVERLAY_SUCCESS,
					failureType: UPDATE_ROSH_OVERLAY_FAILURE,
				},
				options: {
					data,
				}
			},
		});
	};
}