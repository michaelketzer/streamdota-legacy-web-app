import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Ui, uiReducer, initialUiState } from './reducer/Ui';
import { createReducer } from './reducer/util/Reducer';
import { HYDRATE, MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import networkMiddleware from './middleware/NetworkMiddleware';
import { CommandState, commandReducer } from './reducer/Command';
import { entitiesReducer } from './reducer/util/EntityReducer';
import { combiner } from './reducer/util/Combiner';
import { TimerState, timerReducer } from './reducer/Timer';
import { DotaOverlayState, dotaOverlayReducer } from './reducer/DotaOverlay';
import { googleFontReducer, FontState } from './reducer/GoogleFonts';
import { BetSeasonState, betSeasonReducer } from './reducer/BetSeason';
import { BetSeasonInviteState, betSeasonInviteReducer } from './reducer/BetSeasonInvites';
import { BetSeasonUserState, betSeasonUserReducer } from './reducer/BetSeasonUser';
import { BetSeasonToplistState, betSeasonToplistReducer } from './reducer/BetSeasonToplist';
import { BetRoundState, betRoundReducer } from './reducer/BetRound';
import { SteamConnectionState, steamConnectionReducer } from './reducer/SteamConnection';

export interface State {
	entities: {
		betRound: BetRoundState;
		betSeason: BetSeasonState;
		betSeasonInvite: BetSeasonInviteState;
		betSeasonUser: BetSeasonUserState;
		betSeasonToplist: BetSeasonToplistState;
		command: CommandState;
		dotaOverlay: DotaOverlayState;
		googleFont: FontState;
		steamConnection: SteamConnectionState;
		timer: TimerState;
	};
	ui: Ui;
}
const initial: State = {
	entities: {
		betRound: undefined,
		betSeason: undefined,
		betSeasonInvite: undefined,
		betSeasonUser: undefined,
		betSeasonToplist: undefined,
		command: undefined,
		dotaOverlay: undefined,
		googleFont: undefined,
		steamConnection: undefined,
		timer: undefined,
	},
	ui: initialUiState,
};

const { addReducer, combinedReducer: stateReducer } = createReducer<State>(initial);

interface HydrateAction {
	type: typeof HYDRATE;
	state: State;
}
addReducer<HydrateAction>(HYDRATE, (store) => ({ ...store }));

export const storeReducer = combineReducers<State>({
	...stateReducer,
	//@ts-ignore
	entities: combiner({
		betRound: entitiesReducer(betRoundReducer, 'betRound'),
		betSeason: entitiesReducer(betSeasonReducer, 'betSeason'),
		betSeasonInvite: entitiesReducer(betSeasonInviteReducer, 'betSeasonInvite'),
		betSeasonUser: entitiesReducer(betSeasonUserReducer, 'betSeasonUser'),
		betSeasonToplist: entitiesReducer(betSeasonToplistReducer, 'betSeasonToplist'),
		command: entitiesReducer(commandReducer, 'command'),
		dotaOverlay: entitiesReducer(dotaOverlayReducer, 'dotaOverlay'),
		googleFont: entitiesReducer(googleFontReducer, 'googleFont'),
		steamConnection: entitiesReducer(steamConnectionReducer, 'steamConnection'),
		timer: entitiesReducer(timerReducer, 'timer'),
	}),
	ui: uiReducer,
});

//@ts-ignore
const makeStore: MakeStore<State> = () => {
	const composeEnhancers = composeWithDevTools({
		hostname: 'localhost',
		realtime: true,
		name: 'streamdota',
		port: 8000,
	});
	//@ts-ignore
	return createStore(storeReducer, composeEnhancers(applyMiddleware(thunk, networkMiddleware)));
};
export const wrapper = createWrapper<State>(makeStore);
