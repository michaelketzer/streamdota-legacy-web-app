import React, { createContext, ReactElement, useReducer, useContext, Dispatch, useEffect } from 'react';
import { useAbortFetch } from '../../../../hooks/abortFetch';
import Loader from '../../../Loader';
import ContextProvider from '../../../context/websocket/context';
import { initialState, reducer, MessageType } from '../../../context/websocket/state';
import { BetState, betReducer, updateState, CurrentBetRound } from './state';
import { fetchCurrentBetRound } from '../../../../api/bets';
import { useMessageListener } from '../../../context/websocket/MessageHandler';
import { useCurrentUser } from '../../../../hooks/currentUser';

const context = createContext({});
export const useBetState = (): [BetState, Dispatch<{}>] => useContext(context) as [BetState, Dispatch<{}>];

const BetStateUpdated = () => {
	const message = useMessageListener();
	const [ , dispatch ] = useBetState();

	useEffect(
		() => {
			if (message && message.type === MessageType.betting) {
				dispatch(updateState(message.value));
			}
		},
		[ message ]
	);

	return <React.Fragment />;
};

const defaultBetState: CurrentBetRound = {
	id: '',
	status: 'finished',
	created: 0,
	result: '',
	bets: 0,
	aBets: 0,
	bBets: 0,
	chatters: 0,
};

const BetContextProvider = ({ children, initialState }) => {
	return (
		<context.Provider value={useReducer(betReducer, initialState)}>
			<BetStateUpdated />
			{children}
		</context.Provider>
	);
};

export default function BetContext({ children }: { children: ReactElement }): ReactElement {
	const user = useCurrentUser();
	const [ status ] = useAbortFetch(fetchCurrentBetRound);

	console.log(status);
	if (user && status !== undefined) {
		return (
			<ContextProvider
				initialState={initialState}
				reducer={reducer}
				url={'ws://localhost/bets/live/' + (user && user.frameApiKey)}>
				<BetContextProvider initialState={status || defaultBetState}>{children}</BetContextProvider>
			</ContextProvider>
		);
	}

	return <Loader />;
}
