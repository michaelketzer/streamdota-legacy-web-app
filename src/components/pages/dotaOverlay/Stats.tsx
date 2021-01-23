import React, { ReactElement, useCallback } from 'react';
import Loader from '../../Loader';
import { Radio, Typography, Switch, Button, Popconfirm } from 'antd';
import { useCurrentUser } from '../../../hooks/currentUser';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../../modules/reducer/Ui';
import { User } from '@streamdota/shared-types';
import i18nInstance from '../../../i18n';
import { WithTranslation } from 'next-i18next';
import ContextProvider from '../../context/websocket/context';
import { initialState, reducer } from '../../context/websocket/state';
import getWebsocketUrl from '../../../modules/Router';
import DotaGamesTable from './DotaGamesTable';
import { DeleteOutlined } from '@ant-design/icons';
import { removeAllGames } from '../../../modules/reducer/DotaStats';

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px',
};

const Stats = ({t}: WithTranslation): ReactElement => {
	const user = useCurrentUser();
	const dispatch = useDispatch();

	const patch = useCallback(async (data: Partial<User>) => {
		dispatch(updateCurrentUser(data));
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
					<Radio style={radioStyle} value={'manual'}>
						{t('settings-manual')}
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

				<br />
				<br />
				<br />

				<div className={'stats'}>
					<Typography.Title level={4}>{t('stats-table-header')}</Typography.Title>
					<ContextProvider initialState={initialState} reducer={reducer} url={getWebsocketUrl() + '/dota-gsi/live/' + user.frameApiKey}>
						<DotaGamesTable/>
					</ContextProvider>

					{user.dotaStatsFrom === 'manual' && <>
						<br />
						<Popconfirm title={t('stats-reset-all-games')} onConfirm={async () => dispatch(removeAllGames())} okText={t('stats-reset')} cancelText={t('stats-cancel')}>
							<Button
								type={'primary'}
								danger
								icon={<DeleteOutlined />}
							>
								{t('stats-reset')}
							</Button>
						</Popconfirm>
					</>}
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

					.stats {
						max-width: 600px;
					}
				`}</style>
			</React.Fragment>
		);
	}

	return <Loader />;
}

export default i18nInstance.withTranslation('dotaWL')(Stats);
