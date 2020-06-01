import React, { ReactElement, useState, useEffect } from 'react';
import { fetchUserBetSeasons } from '../../../api/betSeason';
import { useAbortFetch } from '../../../hooks/abortFetch';
import { BetSeason } from '../../../api/@types/BetSeason';
import Loader from '../../Loader';
import { Typography, Select } from 'antd';
import { useCurrentUser } from '../../../hooks/currentUser';

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

interface Props {
	season: number;
	setSeason: (season: number) => void;
}

export default function CategorySelect({ season, setSeason }: Props): ReactElement {
	const [ seasons ] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);
	if (seasons) {
		return (
			<React.Fragment>
				<Typography.Text strong>Kategorie</Typography.Text>
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
