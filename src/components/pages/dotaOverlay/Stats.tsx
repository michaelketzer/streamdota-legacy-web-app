import React, { ReactElement, useCallback } from 'react';
import Loader from '../../Loader';
import { Radio, Typography } from 'antd';
import { useCurrentUser } from '../../../hooks/currentUser';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../../modules/reducer/Ui';
import { User } from '@streamdota/shared-types';
import i18nInstance from '../../../i18n';
import { WithTranslation } from 'next-i18next';

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px',
};

const Stats = ({t}: WithTranslation): ReactElement => {
	const user = useCurrentUser();
	const dispatch = useDispatch();

	const patch = useCallback(async (dotaStatsFrom: User['dotaStatsFrom']) => {
		await dispatch(updateCurrentUser({ dotaStatsFrom }));
	}, []);

	if (user) {
		return (
			<React.Fragment>
				<Typography.Title level={4}>{t('settings-title')}</Typography.Title>

				<Radio.Group onChange={(e) => patch(e.target.value)} value={user.dotaStatsFrom}>
					<Radio style={radioStyle} value={'session'}>
						{t('settings-session')}
					</Radio>
					<Radio style={radioStyle} value={'day'}>
						{t('settings-day')}
					</Radio>
				</Radio.Group>
			</React.Fragment>
		);
	}

	return <Loader />;
}

export default i18nInstance.withTranslation('dotaWL')(Stats);
