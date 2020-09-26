import React, { ReactElement, useState, useEffect, Fragment } from 'react';
import { useCurrentUser } from '../../../hooks/currentUser';
import { useDispatch } from 'react-redux';
import { AntiSnipeOverlay } from '@streamdota/shared-types';
import FrameLink from '../dotaOverlay/Overlay/FrameLink';
import { WithTranslation } from 'next-i18next';
import i18nInstance from '../../../i18n';
import { patchAntiSnipe } from '../../../modules/reducer/AntiSnipeOverlay';
import { useAntiSnipeOvelay } from '../../../modules/selector/AntiSnipeOverlay';
import Type from './Type';
import { InputNumber } from 'antd';
import Preview from './Preview';


const OverlaySetup = ({t}: WithTranslation): ReactElement | null => {
	const userData = useCurrentUser();
	const antiSnipeOverlay = useAntiSnipeOvelay();
    const dispatch = useDispatch();
    const [overlay, setOverlay] = useState(antiSnipeOverlay);
    useEffect(() => setOverlay(antiSnipeOverlay), [antiSnipeOverlay]);

	const patch = (data: Partial<AntiSnipeOverlay>) => {
		setOverlay({...overlay, ...data});
		dispatch(patchAntiSnipe(data));
	};

	if (overlay) {
		return (
			<Fragment>
				<div className={'setup'}>
					<div className={'col'}>
                        <Type type={overlay.type} setType={(type) => patch({type})} />

						<br />
						<br />

                        <div><b>{t('antiSnipe-opacity')}</b></div>
                        <InputNumber min={10} max={100} value={overlay.opacity} onChange={(opacity) => patch({opacity: +opacity})} />

                        <br />
                        <br />
                        <div><b>{t('antiSnipe-preview')}</b></div>
						<Preview {...overlay} />
					</div>

                    <div className={'col'}>
						<FrameLink auth={userData?.frameApiKey || ''} access={'antiSnipe'} testing width={280} height={286} />

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


export default i18nInstance.withTranslation('antiSnipe')(OverlaySetup);