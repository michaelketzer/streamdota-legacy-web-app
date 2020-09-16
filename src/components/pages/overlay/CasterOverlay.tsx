import { CastingOverlay } from "@streamdota/shared-types";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { patchCastingOverlay } from "../../../modules/reducer/CasterOverlay";
import { useCasterOverlay } from "../../../modules/selector/CastingOverlay";
import { useGoogleFont } from "../../../modules/selector/GoogleFonts";
import Color from "../dotaOverlay/Overlay/Color";
import FontSelector from "../dotaOverlay/Overlay/FontSelector";
import FontVariantSelection from "../dotaOverlay/Overlay/FontVariantSelection";
import { FontLoaderFc } from "../dotaOverlay/OverlaySetup";

export default function CasterOverlay(): ReactElement {
    const rawFonts = useGoogleFont();
    const casterOverlay = useCasterOverlay();
    const dispatch = useDispatch();
    const [overlay, setOverlay] = useState(casterOverlay);
    useEffect(() => setOverlay(casterOverlay), [casterOverlay]);

	const patch = (data: Partial<CastingOverlay>) => {
		setOverlay({...overlay, ...data});
		dispatch(patchCastingOverlay(data));
    };
    
	if (overlay) {
		return (
			<Fragment>
				<h1>{'Caster Overlays'}</h1>
				<FontLoaderFc font={overlay.font} rawFonts={rawFonts} />

				<div className={'setup'}>
					<div className={'col'}>
						<FontSelector rawFonts={rawFonts} selected={overlay.font} setSelected={(font) => patch({ font })} />
						<FontVariantSelection
							rawFonts={rawFonts}
							font={overlay.font}
							variant={overlay.variant}
							setVariant={(variant) => patch({ variant })}
						/>
						<br />
						<br />
						<Color
							value={overlay.background}
							setValue={(background) => patch({ background })}
							label={'Hintergrund Farbe'}
						/>
					</div>
				</div>

				<style>{`
                    .setup {
                        margin: 20px -20px -20px -20px;
                        display: flex;
                    }

                    .col {
                        padding: 20px;
                        width: 50%;
                    }
            `}</style>
			</Fragment>
		);
	}

	return null;
}