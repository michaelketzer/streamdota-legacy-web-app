import React, { ReactElement, useCallback } from 'react';
import Loader from '../../Loader';
import { Radio, Typography } from 'antd';
import { User } from '../../../api/@types/User';
import { useCurrentUser } from '../../../hooks/currentUser';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../../modules/reducer/Ui';

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px',
};

export default function Stats(): ReactElement {
	const user = useCurrentUser();
	const dispatch = useDispatch();

	const patch = useCallback(async (dotaStatsFrom: User['dotaStatsFrom']) => {
		await dispatch(updateCurrentUser({ dotaStatsFrom }));
	}, []);

	if (user) {
		return (
			<React.Fragment>
				<Typography.Title level={4}>Lege fest, ab wann die Stats gezählt werden sollen:</Typography.Title>

				<Radio.Group onChange={(e) => patch(e.target.value)} value={user.dotaStatsFrom}>
					<Radio style={radioStyle} value={'session'}>
						Session - Der Stand ist “0 - 0” sobald der Stream startet
					</Radio>
					<Radio style={radioStyle} value={'day'}>
						Tag - Es werden alle Stats des aktuellen Tages gezählt
					</Radio>
				</Radio.Group>
			</React.Fragment>
		);
	}

	return <Loader />;
}
