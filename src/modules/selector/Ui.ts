import { State } from '../Store';
import { User } from '@streamdota/shared-types';

export const currentUserSelector = (state: State): User | null => state.ui.currentUser;
export const loadedBetSeasonsSelector = (state: State): boolean => state.ui.loadedEntities.betSeasons;
export const loadedCommandsSelector = (state: State): boolean => state.ui.loadedEntities.commands;
export const loadedTimersSelector = (state: State): boolean => state.ui.loadedEntities.timers;
export const loadedGoogleFontsSelector = (state: State): boolean => state.ui.loadedEntities.googleFonts;

export const loadedBeatSeasonInvitesSelector = (state: State): number[] => state.ui.loadedEntities.betSeasonInvites;
export const loadedBeatSeasonUsersSelector = (state: State): number[] => state.ui.loadedEntities.betSeasonUsers;
export const loadedBeatSeasonToplistSelector = (state: State): number[] => state.ui.loadedEntities.betSeasonToplists;
export const loadedBetRoundsSelector = (state: State): number[] => state.ui.loadedEntities.betRounds;