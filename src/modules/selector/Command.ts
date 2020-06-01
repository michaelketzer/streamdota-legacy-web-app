import { State } from '../Store';
import { Command } from '@streamdota/shared-types';
import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUserCommands } from '../reducer/Command';
import { loadedCommandsSelector } from './Ui';

export const commandEntitiesSelector = (state: State): { [x: number]: Command } => state.entities.command;

export const commandsSelector = (state: State): Command[] | undefined =>
	state.entities.command ? Object.values(state.entities.command) : undefined;

export const commandsByTypeSelector = createSelector(commandsSelector, (commands) =>
	memoize((selType: Command['type']) => (commands ? commands.filter(({ type }) => type === selType) : undefined))
);

export function useUserCommands(type: Command['type']): Command[] | undefined {
	const commands = useSelector(commandsByTypeSelector)(type);
	const loaded = useSelector(loadedCommandsSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadUserCommands());
			}
		},
		[ loaded ]
	);

	return commands;
}
