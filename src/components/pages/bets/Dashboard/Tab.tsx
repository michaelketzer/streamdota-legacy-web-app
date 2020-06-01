import { ReactElement, useCallback } from 'react';
import { useAbortFetch } from '../../../../hooks/abortFetch';
import { patchUser } from '../../../../api/user';
import { Switch } from 'antd';
import { BetSeason } from '../../../../api/@types/BetSeason';
import { fetchUserBetSeasons } from '../../../../api/betSeason';
import FirstTimeSetup from '../FirstTimeSetup';
import Dashboard from './Dashboard';
import BetContext from '../BetContext/Context';
import { useCurrentUser } from '../../../../hooks/currentUser';
import React from 'react';

export default function Tab(): ReactElement {
	const user = useCurrentUser();
	const [ seasons ] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);
	const onToggleBets = useCallback(
		async () => {
			await patchUser({ useBets: user.useBets ? 0 : 1 });
			//await reload();
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
