import { State } from "../Store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AntiSnipeOverlayState, loadAntiSnipeOverlay } from "../reducer/AntiSnipeOverlay";

export const antiSnipeLoadedSelector = (state: State): boolean => state.ui.loadedEntities.antiSnipeOverlay;
export const antiSnipeOverlaySelector = (state: State): AntiSnipeOverlayState | null => state.entities.antiSnipeOverlay;

export function useAntiSnipeOvelay(auth?: string): AntiSnipeOverlayState | null {
    const overlay = useSelector(antiSnipeOverlaySelector);
    const loaded = useSelector(antiSnipeLoadedSelector);
    const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadAntiSnipeOverlay(auth));
			}
		},
		[ auth, loaded ]
	);

	return overlay;
}