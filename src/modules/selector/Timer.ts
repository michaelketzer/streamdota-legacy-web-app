import { State } from '../Store';
import { Timer } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUserTimer } from '../reducer/Timer';
import { loadedTimersSelector } from './Ui';

export const timerEntitiesSelector = (state: State): { [x: number]: Timer } => state.entities.timer;

export const timerSelector = (state: State): Timer[] | undefined =>
	state.entities.timer ? Object.values(state.entities.timer) : undefined;

export function useUserTimer(): Timer[] | undefined {
	const commands = useSelector(timerSelector);
	const loaded = useSelector(loadedTimersSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadUserTimer());
			}
		},
		[ loaded ]
	);

	return commands;
}
