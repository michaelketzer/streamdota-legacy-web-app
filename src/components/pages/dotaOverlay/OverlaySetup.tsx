import React, { ReactElement, useMemo, useState, useEffect, Fragment } from 'react';
import FontSelector from './Overlay/FontSelector';
import FontVariantSelection from './Overlay/FontVariantSelection';
import GoogleFontLoader from 'react-google-font-loader';
import FontSize from './Overlay/FontSize';
import Color from './Overlay/Color';
import Position from './Overlay/Position';
import Background from './Overlay/Background';
import FrameLink from './Overlay/FrameLink';
import { useCurrentUser } from '../../../hooks/currentUser';
import { useDotaOverlay } from '../../../modules/selector/DotaOverlay';
import { useDispatch } from 'react-redux';
import { updateDotaOverlay } from '../../../modules/reducer/DotaOverlay';
import { useGoogleFont } from '../../../modules/selector/GoogleFonts';
import { Font, OverlayConfig } from '@streamdota/shared-types';

function FontLoader({ font, rawFonts }: { font: string; rawFonts: Font[] }): ReactElement | null {
	const fontConfig = useMemo(
		() => {
			if (rawFonts && font && font !== 'Arial') {
				const data = rawFonts.find(({ family }) => family === font);
				return {
					font: data?.family || '',
					weights: data?.subSets || ['400'],
				};
			}
			return null;
		},
		[ font, rawFonts ]
	);

	if (fontConfig) {
		return <GoogleFontLoader fonts={[ fontConfig ]} />;
	}

	return null;
}

const FontLoaderFc = React.memo(FontLoader);

const defaultState: OverlayConfig = {
	font: 'Arial',
	fontSize: 50,
	variant: '400',
	winColor: '#0F0',
	dividerColor: '#D8D6D6',
	lossColor: '#F00',

	winX: 35,
	winY: 5,

	dividerX: 80,
	dividerY: 1,

	lossX: 107,
	lossY: 5,

	showBackground: true,
};

export default function OverlaySetup(): ReactElement | null {
	const userData = useCurrentUser();
	const rawFonts = useGoogleFont();
	const userCfg = useDotaOverlay();
	const [ cfg, setCfg ] = useState<OverlayConfig>(defaultState);
	const dispatch = useDispatch();

	useEffect(
		() => {
			userCfg && setCfg(userCfg);
		},
		[ userCfg ]
	);

	const patch = (newCfg: Partial<OverlayConfig>) => {
		const config = { ...cfg, ...newCfg };
		setCfg(config);
		dispatch(updateDotaOverlay(config));
	};

	if (cfg && Object.keys(cfg).length > 0) {
		return (
			<Fragment>
				<h1>Overlay setup</h1>
				<FontLoaderFc font={cfg.font} rawFonts={rawFonts} />

				<div className={'setup'}>
					<div className={'col'}>
						<FontSelector rawFonts={rawFonts} selected={cfg.font} setSelected={(font) => patch({ font })} />
						<FontVariantSelection
							rawFonts={rawFonts}
							font={cfg.font}
							variant={cfg.variant}
							setVariant={(variant) => patch({ variant })}
						/>
						<FontSize fontSize={cfg.fontSize} setFontSize={(fontSize) => patch({ fontSize })} />
						<br />
						<br />
						<Color
							value={cfg.winColor}
							setValue={(winColor) => patch({ winColor })}
							label={'Farbe Gewonnen'}
						/>
						<Color
							value={cfg.lossColor}
							setValue={(lossColor) => patch({ lossColor })}
							label={'Farbe Verloren'}
						/>
						<Color
							value={cfg.dividerColor}
							setValue={(dividerColor) => patch({ dividerColor })}
							label={'Farbe Trenner'}
						/>
					</div>

					<div className={'col'}>
						<Background cfg={cfg} patch={patch} />
						<Position cfg={cfg} patch={patch} />
						<FrameLink auth={userData?.frameApiKey || ''} access={'dotaStats'} height={60} width={160} />
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
