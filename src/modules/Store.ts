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
import { BetOverlayState, betOverlayReducer } from './reducer/BetOverlay';
import { RoshOverlayState, roshOverlayReducer } from './reducer/RoshOverlay';
import { CasterOverlayState, castingOverlayReducer } from './reducer/CasterOverlay';
import { dotaStatsReducer, DotaStatsState } from './reducer/DotaStats';

export interface State {
	entities: {
		betRound: BetRoundState;
		betOverlay: BetOverlayState;
		castingOverlay: CasterOverlayState;
		roshOverlay: RoshOverlayState;
		betSeason: BetSeasonState;
		betSeasonInvite: BetSeasonInviteState;
		betSeasonUser: BetSeasonUserState;
		betSeasonToplist: BetSeasonToplistState;
		command: CommandState;
		dotaOverlay: DotaOverlayState;
		dotaStats: DotaStatsState;
		googleFont: FontState;
		steamConnection: SteamConnectionState;
		timer: TimerState;
	};
	ui: Ui;
}
const initial: State = {
	entities: {
		betRound: undefined,
		betOverlay: null,
		betSeason: undefined,
		betSeasonInvite: undefined,
		betSeasonUser: undefined,
		betSeasonToplist: undefined,
		castingOverlay: undefined,
		command: undefined,
		dotaOverlay: undefined,
		dotaStats: undefined,
		googleFont: undefined,
		roshOverlay: null,
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
		betOverlay: entitiesReducer(betOverlayReducer, 'betOverlay'),
		betSeason: entitiesReducer(betSeasonReducer, 'betSeason'),
		betSeasonInvite: entitiesReducer(betSeasonInviteReducer, 'betSeasonInvite'),
		betSeasonUser: entitiesReducer(betSeasonUserReducer, 'betSeasonUser'),
		betSeasonToplist: entitiesReducer(betSeasonToplistReducer, 'betSeasonToplist'),
		castingOverlay: entitiesReducer(castingOverlayReducer, 'castingOverlay'),
		command: entitiesReducer(commandReducer, 'command'),
		dotaOverlay: entitiesReducer(dotaOverlayReducer, 'dotaOverlay'),
		dotaStats: entitiesReducer(dotaStatsReducer, 'dotaStats'),
		roshOverlay: entitiesReducer(roshOverlayReducer, 'roshOverlay'),
		googleFont: entitiesReducer(googleFontReducer, 'googleFont'),
		steamConnection: entitiesReducer(steamConnectionReducer, 'steamConnection'),
		timer: entitiesReducer(timerReducer, 'timer'),
	}),
	ui: uiReducer,
});

//@ts-ignore
const makeStore: MakeStore<State> = () => {
	if(process.env.NODE_ENV === 'development') {
		const composeEnhancers = composeWithDevTools({
			hostname: 'localhost',
			realtime: true,
			name: 'streamdota',
			port: 8000,
		});
		//@ts-ignore
		return createStore(storeReducer, composeEnhancers(applyMiddleware(thunk, networkMiddleware)));
	}
	//@ts-ignore
	return createStore(storeReducer, applyMiddleware(thunk, networkMiddleware));
};
export const wrapper = createWrapper<State>(makeStore);
