import React, { ReactElement } from 'react';
import { Select, Typography } from 'antd';
import Loader from '../../../Loader';
import { CategoryProps } from './Category';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../../../modules/reducer/Ui';
import i18nInstance from '../../../../i18n';

const CurrentCategory = ({ t, seasons, currentBetSeason }: CategoryProps): ReactElement => {
	const dispatch = useDispatch();
	if (seasons) {
		return (
			<React.Fragment>
				<Typography.Text strong>{t('bet-season-current-season')}</Typography.Text>
				<br />
				<Select
					value={currentBetSeason}
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

export default i18nInstance.withTranslation('betSystem')(CurrentCategory);
