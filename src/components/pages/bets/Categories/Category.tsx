import React, { ReactElement, useMemo, useEffect } from 'react';
import { useAbortFetch } from '../../../../hooks/abortFetch';
import { BetSeasonUser } from '../../../../api/@types/BetSeason';
import { getUsers } from '../../../../api/betSeason';
import { Typography, Row, Col } from 'antd';
import CurrentCategory from './CurrentCategory';
import CategoryList from './CategoryList';
import CategoryInvites from './CategoryInvites';
import CategoryUsers from './CategoryUsers';
import { BetSeason, User } from '@streamdota/shared-types';
import { useBetSeasons } from '../../../../modules/selector/BetSeason';

export interface CategoryProps {
	seasons: BetSeason[];
	reload?: () => void;
	currentBetSeason?: number;
}

export default function Category({ user }: { user: User }): ReactElement {
	const seasons = useBetSeasons();
	const currentSeasonName = useMemo(
		() => (seasons && user.betSeasonId && seasons.find(({ id }) => id === user.betSeasonId).name) || '',
		[ user, seasons ]
	);
	const [ users, reloadUsers ] = useAbortFetch<BetSeasonUser[]>(getUsers, user.betSeasonId);
	const canManage = useMemo(() => users && users.find(({ userRole }) => userRole === 'owner').id === user.id, [
		users,
	]);

	useEffect(
		() => {
			if (user) {
				reloadUsers();
			}
		},
		[ user ]
	);

	return (
		<React.Fragment>
			<Typography.Paragraph>
				Kategorien ist gleichzusetzen mit einer “Season”. Wettrunden werden immer für eine aktuell ausgewählte
				Kategorie gestartet. Du kannst hier alle Kategorien verwalten.
			</Typography.Paragraph>

			<div style={{ margin: '30px 0' }} />

			<Row gutter={[ 50, 50 ]}>
				<Col span={12}>
					<CurrentCategory seasons={seasons} reload={() => undefined} currentBetSeason={user.betSeasonId} />
					<CategoryList
						seasons={seasons}
						reload={() => undefined}
						currentBetSeason={user.betSeasonId}
						canManage={canManage}
					/>
				</Col>

				{user.betSeasonId && (
					<Col span={12}>
						<CategoryInvites name={currentSeasonName} seasonId={user.betSeasonId} canManage={canManage} />
						<div style={{ margin: '30px 0' }} />
						<CategoryUsers name={currentSeasonName} seasonId={user.betSeasonId} canManage={canManage} />
					</Col>
				)}
			</Row>
		</React.Fragment>
	);
}
