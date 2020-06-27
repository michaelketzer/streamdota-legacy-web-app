import { CALL_API, ActionDispatcher } from "../middleware/NetworkMiddlewareTypes";
import NetworkError from "../middleware/NetworkError";
import { LOAD_BET_OVERLAY_REQUEST, LOAD_BET_OVERLAY_SUCCESS, LOAD_BET_OVERLAY_FAILURE, UPDATE_BET_OVERLAY_REQUEST, UPDATE_BET_OVERLAY_SUCCESS, UPDATE_BET_OVERLAY_FAILURE } from "./Actions";
import { schema } from "normalizr";
import { createReducer } from "./util/Reducer";
import { BetOverlay } from "@streamdota/shared-types";

export type BetOverlayState = BetOverlay;
export const betOverlay = new schema.Entity('betOverlay');

interface BetOverlayLoaded {
	type: typeof LOAD_BET_OVERLAY_SUCCESS;
	response: BetOverlayState;
}

const { addReducer, combinedReducer } = createReducer<BetOverlayState>();

addReducer<BetOverlayLoaded>(LOAD_BET_OVERLAY_SUCCESS, (_state, {response}) => {
	return response;
});

export const betOverlayReducer = combinedReducer;

export function loadBetOverlay(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
                endpoint: `${process.env.API_URL}/betsOverlay`,
				types: {
					requestType: LOAD_BET_OVERLAY_REQUEST,
					successType: LOAD_BET_OVERLAY_SUCCESS,
					failureType: LOAD_BET_OVERLAY_FAILURE,
                },
			},
		});
	};
}

export function patchBetOverlay(data: Partial<BetOverlay>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betsOverlay`,
				method: 'patch',
				types: {
					requestType: UPDATE_BET_OVERLAY_REQUEST,
					successType: UPDATE_BET_OVERLAY_SUCCESS,
					failureType: UPDATE_BET_OVERLAY_FAILURE,
				},
				options: {
					data,
				}
			},
		});
	};
}