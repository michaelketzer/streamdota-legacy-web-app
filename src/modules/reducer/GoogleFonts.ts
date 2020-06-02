import { Font } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { LOAD_GOOGLE_FONTS_REQUEST, LOAD_GOOGLE_FONTS_SUCCESS, LOAD_GOOGLE_FONTS_FAILURE } from './Actions';

export interface FontState {
	[x: string]: Font;
}

export const font = new schema.Entity(
	'command',
	{},
	{
		idAttribute: 'family',
	}
);

const { combinedReducer } = createReducer<FontState>();
export const googleFontReducer = combinedReducer;

export function loadGoogleFonts(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/googleFonts`,
				schema: [ font ],
				types: {
					requestType: LOAD_GOOGLE_FONTS_REQUEST,
					successType: LOAD_GOOGLE_FONTS_SUCCESS,
					failureType: LOAD_GOOGLE_FONTS_FAILURE,
				},
			},
		});
	};
}
