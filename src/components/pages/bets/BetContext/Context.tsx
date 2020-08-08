import React, { ReactElement, useEffect } from 'react';
import Loader from '../../../Loader';
import ContextProvider from '../../../context/websocket/context';
import { initialState, reducer, MessageType } from '../../../context/websocket/state';
import { useMessageListener } from '../../../context/websocket/MessageHandler';
import { useCurrentUser } from '../../../../hooks/currentUser';
import { useCurrentBetRound } from '../../../../modules/selector/BetRound';
import { BetRoundStats, BetRound } from '@streamdota/shared-types';
import { useDispatch } from 'react-redux';
import { updateCurrentBetTound } from '../../../../modules/reducer/Ui';

const BetStateUpdated = () => {
	const message = useMessageListener();
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (message && message.type === MessageType.betting) {
				dispatch(updateCurrentBetTound(message.value as unknown as BetRound));
			}
		},
		[ message ]
	);

	return <React.Fragment />;
};

export const defaultBetState: BetRoundStats = {
	betSeason: 0,
	id: 0,
	round: 0,
	userId: 0,
	status: 'finished',
	created: 0,
	result: '',
	total: 0,
	aBets: 0,
	bBets: 0,
	chatters: 0,
};

export default function BetContext({ auth, children }: { auth?: string; children: ReactElement }): ReactElement {
	const user = useCurrentUser(auth);
	const status = useCurrentBetRound(auth);

	if (user && status) {
		return (
			<ContextProvider
				initialState={initialState}
				reducer={reducer}
				url={'wss://'+process.env.API_URL+'/bets/live/' + (user && user.frameApiKey)}>
				<BetStateUpdated />
				{children}
			</ContextProvider>
		);
	}

	return <Loader />;
}
