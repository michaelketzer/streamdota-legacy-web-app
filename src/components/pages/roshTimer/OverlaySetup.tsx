import React, { ReactElement, useMemo, useState, useEffect, Fragment } from 'react';
import { useCurrentUser } from '../../../hooks/currentUser';
import { useDispatch } from 'react-redux';
import { useGoogleFont } from '../../../modules/selector/GoogleFonts';
import { RoshOverlay } from '@streamdota/shared-types';
import { useRoshOverlay } from '../../../modules/selector/RoshOverlay';
import { patchRoshOverlay } from '../../../modules/reducer/RoshOverlay';
import { FontLoaderFc } from '../dotaOverlay/OverlaySetup';
import FontSelector from '../dotaOverlay/Overlay/FontSelector';
import FontVariantSelection from '../dotaOverlay/Overlay/FontVariantSelection';
import FontSize from '../dotaOverlay/Overlay/FontSize';
import Color from '../dotaOverlay/Overlay/Color';
import FrameLink from '../dotaOverlay/Overlay/FrameLink';
import Preview from './Preview';
import { WithTranslation } from 'next-i18next';
import i18nInstance from '../../../i18n';


const OverlaySetup = ({t}: WithTranslation): ReactElement | null => {
	const userData = useCurrentUser();
	const rawFonts = useGoogleFont();
	const roshOverlay = useRoshOverlay();
    const dispatch = useDispatch();
    const [overlay, setOverlay] = useState(roshOverlay);
    useEffect(() => setOverlay(roshOverlay), [roshOverlay]);

	const patch = (data: Partial<RoshOverlay>) => {
		setOverlay({...overlay, ...data});
		dispatch(patchRoshOverlay(data));
	};

	if (overlay) {
		return (
			<Fragment>
				<h1>{t('roshanTimer-overlay')}</h1>
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
						<FontSize fontSize={overlay.fontSize} setFontSize={(fontSize) => patch({ fontSize })} />
						<br />
						<br />
						<Color
							value={overlay.aegisColor}
							setValue={(aegisColor) => patch({ aegisColor })}
							label={t('roshanTimer-colorAegis')}
						/>
						<Color
							value={overlay.baseColor}
							setValue={(baseColor) => patch({ baseColor })}
							label={t('roshanTimer-colorBase')}
						/>
						<Color
							value={overlay.variableColor}
							setValue={(variableColor) => patch({ variableColor })}
							label={t('roshanTimer-colorVariable')}
						/>
					</div>

                    <div className={'col'}>
						<FrameLink auth={userData?.frameApiKey || ''} access={'casting/roshanTimer'} testing width={1920} height={1080} />

						<div><b>{t('roshanTimer-preview')}</b></div>
						<Preview overlay={overlay} />
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


export default i18nInstance.withTranslation('roshTimer')(OverlaySetup);