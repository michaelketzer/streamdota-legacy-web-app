import { User } from '@streamdota/shared-types';
import {
	SET_UI,
	LOAD_CURRENT_USER_SUCCESS,
	LOAD_CURRENT_USER_REQUEST,
	LOAD_CURRENT_USER_FAILURE,
	UPDATE_CURRENT_USER_FAILURE,
	UPDATE_CURRENT_USER_SUCCESS,
	UPDATE_CURRENT_USER_REQUEST,
	LOAD_COMMANDS_SUCCESS,
} from './Actions';
import { DeepPartial } from 'redux';
import { ApiActionResponse } from '../middleware/Network';
import { createReducer } from './util/Reducer';
import { mergeStates } from './util/MergeStates';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { currentUserSelector } from '../selector/Ui';

export interface Ui {
	currentUser: User | null;
	loadedEntities: {
		commands: boolean;
	};
}

export const initialUiState: Ui = {
	currentUser: null,
	loadedEntities: {
		commands: false,
	},
};

interface UiSet {
	type: typeof SET_UI;
	ui: DeepPartial<Ui>;
}

interface CommandsLoaded {
	type: typeof LOAD_COMMANDS_SUCCESS;
}

interface CurrentUserSuccess extends ApiActionResponse<User> {
	type: typeof LOAD_CURRENT_USER_SUCCESS;
}

const { addReducer, combinedReducer } = createReducer<Ui>(initialUiState);

addReducer<UiSet>(SET_UI, (state, action) => mergeStates(state, action.ui));
addReducer<CurrentUserSuccess>(LOAD_CURRENT_USER_SUCCESS, (state, { response: currentUser }) => {
	return {
		...state,
		currentUser: {
			...currentUser,
			gsiConnected: Boolean(currentUser.gsiConnected),
			useBets: Boolean(currentUser.useBets),
		},
	};
});

addReducer<CommandsLoaded>(LOAD_COMMANDS_SUCCESS, (state) => {
	return {
		...state,
		loadedEntities: {
			...state.loadedEntities,
			commands: true,
		},
	};
});

export const uiReducer = combinedReducer;

export function loadCurrentUser(): ActionDispatcher<Promise<void>> {
	return async (dispatch, getState) => {
		const response = await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/user/baseData`,
				types: {
					requestType: LOAD_CURRENT_USER_REQUEST,
					successType: LOAD_CURRENT_USER_SUCCESS,
					failureType: LOAD_CURRENT_USER_FAILURE,
				},
			},
		});

		if (!response || (response as NetworkError).responseStatus === 401) {
			location.href = `${process.env.API_URL}/auth/twitch`;
		}
	};
}

export function updateCurrentUser(data: Partial<User>): ActionDispatcher<Promise<void>> {
	return async (dispatch, getState) => {
		if (currentUserSelector(getState())) {
			await dispatch<Promise<Response | NetworkError>>({
				[CALL_API]: {
					endpoint: `${process.env.API_URL}/user/baseData`,
					method: 'patch',
					types: {
						requestType: UPDATE_CURRENT_USER_REQUEST,
						successType: UPDATE_CURRENT_USER_SUCCESS,
						failureType: UPDATE_CURRENT_USER_FAILURE,
					},
					options: {
						data,
					},
				},
			});

			await dispatch(loadCurrentUser());
		}
	};
}
