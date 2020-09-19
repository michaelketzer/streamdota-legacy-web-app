import React, { ReactElement, useEffect } from 'react';
import Loader from '../../../Loader';
import ContextProvider from '../../../context/websocket/context';
import { initialState, reducer, isBettingV2Message, BetRoundData } from '../../../context/websocket/state';
import { useMessageListener } from '../../../context/websocket/MessageHandler';
import { useCurrentUser } from '../../../../hooks/currentUser';
import { useDispatch } from 'react-redux';
import { updateCurrentBetTound } from '../../../../modules/reducer/Ui';
import getWebsocketUrl from '../../../../modules/Router';

const BetStateUpdated = () => {
	const message = useMessageListener();
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (message && isBettingV2Message(message)) {
				dispatch(updateCurrentBetTound(message.value));
			}
		},
		[ message ]
	);

	return <React.Fragment />;
};

export const defaultBetState: BetRoundData | null = null;

export default function BetContext({ auth, children }: { auth?: string; children: ReactElement }): ReactElement {
	const user = useCurrentUser(auth);

	if (user) {
		return (
			<ContextProvider
				initialState={initialState}
				reducer={reducer}
				url={getWebsocketUrl()+'/bets/live/' + (user && user.frameApiKey)}>
				<BetStateUpdated />
				{children}
			</ContextProvider>
		);
	}

	return <Loader />;
}
