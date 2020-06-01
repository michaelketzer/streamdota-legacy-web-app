import { ReactElement, Fragment } from 'react';
import { Typography, Tag } from 'antd';
import CommandList from '../bot/CommandList';
import Tags from '../../Commands/Tags';

export default function Commands(): ReactElement {
	return (
		<Fragment>
			<div>
				<Typography.Text strong>Variabeln</Typography.Text>
			</div>
			<div>
				<Typography.Text>
					Du kannst in den Antworten eines Commands folgende Variabeln benutzen:
				</Typography.Text>
			</div>

			<Tags tags={[ 'total_games', 'games_won', 'games_lost' ]} />

			<div>
				<Typography.Text strong>Commands</Typography.Text>
			</div>
			<CommandList commandType={'dotaWL'} />
		</Fragment>
	);
}
