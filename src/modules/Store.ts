import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Ui, uiReducer, initialUiState } from './reducer/Ui';
import { createReducer } from './reducer/util/Reducer';
import { HYDRATE, MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import networkMiddleware from './middleware/NetworkMiddleware';

export interface State {
	ui: Ui;
}
const initial: State = {
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
