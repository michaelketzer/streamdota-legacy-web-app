import React, { ReactElement } from 'react';
import { Select, Typography } from 'antd';
import Loader from '../../../Loader';
import { CategoryProps } from './Category';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../../../modules/reducer/Ui';

export default function CurrentCategory({ seasons, currentBetSeason }: CategoryProps): ReactElement {
	const dispatch = useDispatch();
	if (seasons) {
		return (
			<React.Fragment>
				<Typography.Text strong>Aktuelle Kategorie</Typography.Text>
				<br />
				<Select
					defaultValue={currentBetSeason}
					style={{ width: '200px' }}
					onChange={async (betSeasonId) => {
						await dispatch(updateCurrentUser({ betSeasonId }));
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
