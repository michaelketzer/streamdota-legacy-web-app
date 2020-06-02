import { State } from '../Store';
import { User } from '@streamdota/shared-types';

export const currentUserSelector = (state: State): User | null => state.ui.currentUser;
export const loadedCommandsSelector = (state: State): boolean => state.ui.loadedEntities.commands;
export const loadedTimersSelector = (state: State): boolean => state.ui.loadedEntities.timers;
export const loadedGoogleFontsSelector = (state: State): boolean => state.ui.loadedEntities.googleFonts;
