import React, { ReactElement, useCallback } from 'react';
import Loader from '../../Loader';
import { Radio, Typography, Switch } from 'antd';
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

	const patch = useCallback(async (data: Partial<User>) => {
		await dispatch(updateCurrentUser(data));
	}, []);

	if (user) {
		return (
			<React.Fragment>
				<Typography.Title level={4}>{t('settings-title')}</Typography.Title>

				<Radio.Group onChange={(e) => patch({dotaStatsFrom: e.target.value as User['dotaStatsFrom']})} value={user.dotaStatsFrom}>
					<Radio style={radioStyle} value={'session'}>
						{t('settings-session')}
					</Radio>
					<Radio style={radioStyle} value={'day'}>
						{t('settings-day')}
					</Radio>
				</Radio.Group>

				<br />
				<br />
				<br />

				<Typography.Title level={4}>{t('settings-visible-title')}</Typography.Title>
				<br />

				<div className={'row'}>
					<Switch 
						checked={Boolean(user.dotaStatsMenuHidden)} 
						onChange={(checked) => patch({dotaStatsMenuHidden: checked})} 
					/>
					<div className={'label'} onClick={() => patch({dotaStatsMenuHidden: !Boolean(user.dotaStatsMenuHidden)})}>{t('settings-visible-menu')}</div>
				</div>

				<br />

				<div className={'row'}>
					<Switch 
						checked={Boolean(user.dotaStatsPickHidden)} 
						onChange={(checked) => patch({dotaStatsPickHidden: checked})} 
					/>
					<div className={'label'} onClick={() => patch({dotaStatsPickHidden: !Boolean(user.dotaStatsPickHidden)})}>{t('settings-visible-picking')}</div>
				</div>
				
				<style jsx>{`
					.row {
						display: flex;
						align-items: center;
					}

					.label {
						margin-left: 8px;
						cursor: pointer;
					}
				`}</style>
			</React.Fragment>
		);
	}

	return <Loader />;
}

export default i18nInstance.withTranslation('dotaWL')(Stats);
