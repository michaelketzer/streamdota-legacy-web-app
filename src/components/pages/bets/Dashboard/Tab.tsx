import { ReactElement, useCallback } from 'react';
import { Switch } from 'antd';
import FirstTimeSetup from '../FirstTimeSetup';
import Dashboard from './Dashboard';
import BetContext from '../BetContext/Context';
import { useCurrentUser } from '../../../../hooks/currentUser';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../../../modules/reducer/Ui';
import { useBetSeasons } from '../../../../modules/selector/BetSeason';
import { WithTranslation } from 'next-i18next';
import i18nInstance from '../../../../i18n';

const Tab = ({t}: WithTranslation): ReactElement => {
	const dispatch = useDispatch();
	const user = useCurrentUser();
	const seasons = useBetSeasons();
	const onToggleBets = useCallback(
		async () => {
			await dispatch(updateCurrentUser({ useBets: !user.useBets }));
		},
		[ user ]
	);

	return (
		<React.Fragment>
			<div className={'enableBets'} onClick={onToggleBets}>
				<Switch checked={Boolean(user && user.useBets)} />
				<div className={'label'}>{t('bet-dashboard-active')}</div>
			</div>

			{user && user.useBets && seasons && seasons.length === 0 && <FirstTimeSetup />}
			{user &&
			user.useBets &&
			seasons &&
			seasons.length > 0 && (
				<BetContext>
					<Dashboard />
				</BetContext>
			)}

			<style jsx>{`
				.enableBets {
					display: flex;
					align-items: center;
					cursor: pointer;
				}

				.label {
					margin-left: 10px;
				}
			`}</style>
		</React.Fragment>
	);
}

export default i18nInstance.withTranslation('betSystem')(Tab);