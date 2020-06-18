import { User, DotaStats, BetRound, BetRoundStats } from '@streamdota/shared-types';
import {
	SET_UI,
	LOAD_CURRENT_USER_SUCCESS,
	LOAD_CURRENT_USER_REQUEST,
	LOAD_CURRENT_USER_FAILURE,
	UPDATE_CURRENT_USER_FAILURE,
	UPDATE_CURRENT_USER_SUCCESS,
	UPDATE_CURRENT_USER_REQUEST,
	LOAD_COMMANDS_SUCCESS,
	LOAD_TIMERS_SUCCESS,
	LOAD_GOOGLE_FONTS_SUCCESS,
	LOAD_BET_SEASONS_SUCCESS,
	LOAD_BET_SEASON_INVITES_SUCCESS,
	LOAD_BET_SEASON_USERS_SUCCESS,
	LOAD_BET_SEASON_TOPLIST_SUCCESS,
	LOAD_BET_ROUNDS_SUCCESS,
	LOAD_STEAM_CONNECTIONS_SUCCESS,
	LOAD_DOTA_STATS_SUCCESS,
	LOAD_CURRENT_BET_ROUND_SUCCESS,
} from './Actions';
import { DeepPartial } from 'redux';
import { ApiActionResponse } from '../middleware/Network';
import { createReducer } from './util/Reducer';
import { mergeStates } from './util/MergeStates';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { currentUserSelector } from '../selector/Ui';

export interface Ui {
	currentBetRound: BetRoundStats | null;
	currentUser: User | null;
	dotaStats: DotaStats[] | null;
	loadedEntities: {
		betRounds: number[];
		betSeasons: boolean;
		betSeasonInvites: number[];
		betSeasonUsers: number[];
		betSeasonToplists: number[];
		commands: boolean;
		googleFonts: boolean;
		steamConnections: boolean;
		timers: boolean;
	};
}

export const initialUiState: Ui = {
	currentBetRound: null,
	currentUser: null,
	dotaStats: null,
	loadedEntities: {
		betRounds: [],
		betSeasons: false,
		betSeasonInvites: [],
		betSeasonUsers: [],
		betSeasonToplists: [],
		commands: false,
		googleFonts: false,
		steamConnections: false,
		timers: false,
	},
};

interface UiSet {
	type: typeof SET_UI;
	ui: DeepPartial<Ui>;
}

interface EntityLoaded<T> {
	type: T;
}

interface LoadedBetSeasonAsset<T> {
	type: T;
	options: {
		urlParams: {
			seasonId: number;
		};
	};
}

interface LoadedDotaStats {
	type: typeof LOAD_DOTA_STATS_SUCCESS;
	response: DotaStats[];
}

interface LoadedCurrentBetRound {
	type: typeof LOAD_CURRENT_BET_ROUND_SUCCESS;
	response: BetRoundStats;
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

const flatLoadedEntities = [
	['commands', LOAD_COMMANDS_SUCCESS],
	['timers', LOAD_TIMERS_SUCCESS],
	['googleFonts', LOAD_GOOGLE_FONTS_SUCCESS],
	['betSeasons', LOAD_BET_SEASONS_SUCCESS],
	['steamConnections', LOAD_STEAM_CONNECTIONS_SUCCESS],
];

for(const [key, listener] of flatLoadedEntities) {
	addReducer<EntityLoaded<typeof listener>>(listener, (state) => {
		return {
			...state,
			loadedEntities: {
				...state.loadedEntities,
				[key]: true,
			},
		};
	});
}

const betSeasonAssetsLoaded  = [
	['betSeasonInvites', LOAD_BET_SEASON_INVITES_SUCCESS],
	['betSeasonUsers', LOAD_BET_SEASON_USERS_SUCCESS],
	['betSeasonToplists', LOAD_BET_SEASON_TOPLIST_SUCCESS],
	['betRounds', LOAD_BET_ROUNDS_SUCCESS],
];


for(const [key, listener] of betSeasonAssetsLoaded) {
	addReducer<LoadedBetSeasonAsset<typeof listener>>(listener, (state, {options: {urlParams: {seasonId}}}) => {
		return {
			...state,
			loadedEntities: {
				...state.loadedEntities,
				[key]: state.loadedEntities[key].concat(seasonId),
			},
		};
	});
}

addReducer<LoadedDotaStats>(LOAD_DOTA_STATS_SUCCESS, (state, {response}) => {
	return {
		...state,
		dotaStats: response,
	};
});

addReducer<LoadedCurrentBetRound>(LOAD_CURRENT_BET_ROUND_SUCCESS, (state, {response}) => {
	return {
		...state,
		currentBetRound: response,
	};
});

export const uiReducer = combinedReducer;

export function loadCurrentUser(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
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

export function updateCurrentBetTound(betRound: BetRound): ActionDispatcher<void> {
	return (dispatch) => dispatch({
		type: LOAD_CURRENT_BET_ROUND_SUCCESS,
		response: betRound,
	});
}