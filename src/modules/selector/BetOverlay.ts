import { BetOverlayState, loadBetOverlay } from "../reducer/BetOverlay";
import { State } from "../Store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export const betOverlayLoadedSelector = (state: State): boolean => state.ui.loadedEntities.betOverlay;
export const betOverlaySelector = (state: State): BetOverlayState | null => state.entities.betOverlay;

export function useBetOverlay(): BetOverlayState | null {
    const betOverlay = useSelector(betOverlaySelector);
    const loaded = useSelector(betOverlayLoadedSelector);
    const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadBetOverlay());
			}
		},
		[ loaded,  betOverlay ]
	);

	return betOverlay;
}