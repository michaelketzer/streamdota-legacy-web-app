import { State } from '../Store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DotaStatsState, loadDotaStats } from '../reducer/DotaStats';

export const dotaStatsSelector = (state: State): DotaStatsState => state.entities.dotaStats;
export const dotaStatsLoadedSelector = (state: State): boolean => state.ui.loadedEntities.dotaStats;

export function useDotaStats(): DotaStatsState | undefined {
	const dotaStats = useSelector(dotaStatsSelector);
	const loaded = useSelector(dotaStatsLoadedSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadDotaStats());
			}
		},
		[ loaded ]
    );
    
    console.log(dotaStats);

	return dotaStats;
}
