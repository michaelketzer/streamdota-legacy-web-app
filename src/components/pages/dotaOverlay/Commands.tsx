import { ReactElement, Fragment } from 'react';
import { Typography } from 'antd';
import CommandList from '../bot/CommandList';
import Tags from '../../Commands/Tags';
import { WithTranslation } from 'next-i18next';
import i18nInstance from '../../../i18n';

const Commands = ({t}: WithTranslation): ReactElement => {
	return (
		<Fragment>
			<div>
				<Typography.Text strong>{t('commands-vars')}</Typography.Text>
			</div>
			<div>
				<Typography.Text>
					{t('commands-vars-sub')}
				</Typography.Text>
			</div>

			<Tags tags={[ 'total_games', 'games_won', 'games_lost' ]} />

			<div>
				<Typography.Text strong>{t('commands-title')}</Typography.Text>
			</div>
			<CommandList commandType={'dotaWinLoss'} />
		</Fragment>
	);
}

export default i18nInstance.withTranslation('bot')(Commands);