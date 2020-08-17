import { BetOverlayState, loadBetOverlay } from "../reducer/BetOverlay";
import { State } from "../Store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RoshOverlayState, loadRoshOverlay } from "../reducer/RoshOverlay";

export const roshOverlayLoadedSelector = (state: State): boolean => state.ui.loadedEntities.roshOverlay;
export const roshOverlaySelector = (state: State): RoshOverlayState | null => state.entities.roshOverlay;

export function useRoshOverlay(auth?: string): RoshOverlayState | null {
    const roshOverlay = useSelector(roshOverlaySelector);
    const loaded = useSelector(roshOverlayLoadedSelector);
    const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadRoshOverlay(auth));
			}
		},
		[ auth, loaded ]
	);

	return roshOverlay;
}