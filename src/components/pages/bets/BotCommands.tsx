import { ReactElement, Fragment } from 'react';
import { Typography } from 'antd';
import Tags from '../../Commands/Tags';
import CommandList from '../bot/CommandList';
import { useCommandByIdentifier } from '../../../modules/selector/Command';
import { WithTranslation } from 'next-i18next';
import i18nInstance from '../../../i18n';
import TeamNames from './TeamNames';
import { useCurrentUser } from '../../../hooks/currentUser';

const BotCommands = ({t}: WithTranslation): ReactElement => {
	const betCommand = useCommandByIdentifier('bet');
	const user = useCurrentUser();

	return (
		<Fragment>
			<div>
				<Typography.Text strong>{'Team Names'}</Typography.Text>
			</div>
			<TeamNames />

			<br /><br />
			<div>
				<Typography.Text strong>{t('commands-vars')}</Typography.Text>
			</div>
			<div>
				<Typography.Text>
					{t('commands-vars-sub')}
				</Typography.Text>
			</div>
 
			<Tags
				tags={[
					'bet_command',
					'winner',
					'toplist_stats',
					'user_bets_correct',
					'user_bets_wrong',
					'user_bets_total',
					'user_bets_accuracy',
					'team_a',
					'team_b'
				]}
			/>

			<div>
				<Typography.Text strong>{t('bet-season-commands-streamer')}</Typography.Text>
			</div>
			<CommandList
				commandType={'betting_streamer'}
				replaceVars={{ BET_COMMAND: betCommand && betCommand.command, TEAM_A: user.teamAName, TEAM_B: user.teamBName }}
				canCreate={false}
			/>

			<div style={{ margin: '40px 0' }} />

			<div>
				<Typography.Text strong>{t('bet-season-commands-user')}</Typography.Text>
			</div>
			<CommandList commandType={'betting_user'} replaceVars={{ BET_COMMAND: betCommand && betCommand.command }} />
		</Fragment>
	);
}

export default i18nInstance.withTranslation('betSystem')(BotCommands);