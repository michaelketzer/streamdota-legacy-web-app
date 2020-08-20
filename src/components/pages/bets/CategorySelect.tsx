import React, { ReactElement, useState, useEffect } from 'react';
import Loader from '../../Loader';
import { Typography, Select } from 'antd';
import { useCurrentUser } from '../../../hooks/currentUser';
import { useBetSeasons } from '../../../modules/selector/BetSeason';
import { WithTranslation } from 'next-i18next';
import i18nInstance from '../../../i18n';

interface Params {
	category: number;
	setCategory: (category: number) => void;
}

export function useSelectedCategory(): Params {
	const user = useCurrentUser();
	const [ category, setCategory ] = useState(null);

	useEffect(
		() => {
			user && setCategory(user.betSeasonId);
		},
		[ user ]
	);

	return { category, setCategory };
}

interface Props extends WithTranslation {
	season: number;
	setSeason: (season: number) => void;
}

const CategorySelect = ({ t, season, setSeason }: Props): ReactElement => {
	const seasons = useBetSeasons();

	if (seasons) {
		return (
			<React.Fragment>
				<Typography.Text strong>{t('bet-season-label')}</Typography.Text>
				<br />
				<Select defaultValue={season} onChange={setSeason} style={{ width: '200px' }}>
					{seasons.map(({ id, name }) => (
						<Select.Option key={id} value={id}>
							{name}
						</Select.Option>
					))}
				</Select>
			</React.Fragment>
		);
	}

	return <Loader />;
}

export default i18nInstance.withTranslation('betSystem')(CategorySelect);