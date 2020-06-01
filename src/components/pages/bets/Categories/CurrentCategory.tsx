import React, { ReactElement } from 'react';
import { patchUser } from '../../../../api/user';
import { Select, Typography } from 'antd';
import Loader from '../../../Loader';
import { CategoryProps } from './Category';

export default function CurrentCategory({ seasons, currentBetSeason }: CategoryProps): ReactElement {
	if (seasons) {
		return (
			<React.Fragment>
				<Typography.Text strong>Aktuelle Kategorie</Typography.Text>
				<br />
				<Select
					defaultValue={currentBetSeason}
					style={{ width: '200px' }}
					onChange={async (betSeasonId) => {
						await patchUser({ betSeasonId });
					}}>
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
