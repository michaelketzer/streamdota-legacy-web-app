import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Ui, uiReducer, initialUiState } from './reducer/Ui';
import { createReducer } from './reducer/util/Reducer';
import { HYDRATE, MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import networkMiddleware from './middleware/NetworkMiddleware';
import { CommandState, commandReducer } from './reducer/Command';
import { entitiesReducer } from './reducer/util/EntityReducer';
import { combiner } from './reducer/util/Combiner';
import { TimerState, timerReducer } from './reducer/Timer';

export interface State {
	entities: {
		command: CommandState;
		timer: TimerState;
	};
	ui: Ui;
}
const initial: State = {
	entities: {
		command: undefined,
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
		command: entitiesReducer(commandReducer, 'command'),
		timer: entitiesReducer(timerReducer, 'timer'),
	}),
	ui: uiReducer,
});

const makeStore: MakeStore<State> = () => {
	const composeEnhancers = composeWithDevTools({
		name: 'streamdota',
	});
	//@ts-ignore
	return createStore(storeReducer, composeEnhancers(applyMiddleware(thunk, networkMiddleware)));
};
export const wrapper = createWrapper<State>(makeStore);
