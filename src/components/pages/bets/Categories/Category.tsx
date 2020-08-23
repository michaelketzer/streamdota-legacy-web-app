import React, { ReactElement, useMemo, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import CurrentCategory from './CurrentCategory';
import CategoryList from './CategoryList';
import CategoryInvites from './CategoryInvites';
import CategoryUsers from './CategoryUsers';
import { BetSeason, User } from '@streamdota/shared-types';
import { useBetSeasons } from '../../../../modules/selector/BetSeason';
import { useBetSeasonUsers } from '../../../../modules/selector/BetSeasonUsers';
import { WithTranslation } from 'next-i18next';
import i18nInstance from '../../../../i18n';

export interface CategoryProps extends WithTranslation {
	seasons: BetSeason[];
	currentBetSeason?: number;
}

const Category = ({ user, t }: { user: User } & WithTranslation): ReactElement => {
	const seasons = useBetSeasons();
	const users = useBetSeasonUsers(user.betSeasonId);
	const currentSeasonName = useMemo(
		() => {
			const season = seasons && user && user.betSeasonId && seasons.find(({ id }) => id === user.betSeasonId);
			return season ? season.name : '';
		},
		[ user, seasons ]
	);
	const canManage = useMemo(() => users && users.length > 0 && users.find(({ userRole }) => userRole === 'owner').id === user.id, [
		users,
	]);

	return (
		<React.Fragment>
			<Typography.Paragraph>
				{t('bet-season-info')}
			</Typography.Paragraph>

			<div style={{ margin: '30px 0' }} />

			<Row gutter={[ 50, 50 ]}>
				<Col span={12}>
					<CurrentCategory seasons={seasons} currentBetSeason={user.betSeasonId} />
					<CategoryList
						seasons={seasons}
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

export default i18nInstance.withTranslation('betSystem')(Category);