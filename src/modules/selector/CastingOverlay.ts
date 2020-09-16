import { State } from "../Store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { CasterOverlayState, loadCastingOverlay } from "../reducer/CasterOverlay";

export const castingOverlayLoadedSelector = (state: State): boolean => state.ui.loadedEntities.castingOverlay;
export const castingOverlaySelector = (state: State): CasterOverlayState | null => state.entities.castingOverlay;

export function useCasterOverlay(auth?: string): CasterOverlayState | null {
    const castingOverlay = useSelector(castingOverlaySelector);
    const loaded = useSelector(castingOverlayLoadedSelector);
    const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadCastingOverlay(auth));
			}
		},
		[ auth, loaded ]
	);

	return castingOverlay;
}