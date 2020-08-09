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

export default function Tab(): ReactElement {
	const user = useCurrentUser();
	const dispatch = useDispatch();
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
				<div className={'label'}>Wettsystem aktivieren</div>
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
