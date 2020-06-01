import React, { ReactElement } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import { User } from '@streamdota/shared-types';

export default function FrameLink({ userData }: { userData: User | null }): ReactElement {
	const text = 'https://streamdota.com/frames/dotaStats?auth=' + (userData && userData.frameApiKey);

	return (
		<React.Fragment>
			<div>
				<b>Overlay Frame Source</b>
			</div>
			<Paragraph copyable={{ text }}>{text}</Paragraph>
		</React.Fragment>
	);
}
