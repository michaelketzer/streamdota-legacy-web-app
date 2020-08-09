import React, { ReactElement } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';

interface Props {
	access: string; 
	auth: string;

	height?: number | null;
	width?: number | null;
}

export default React.memo(function FrameLink({ access, auth, height = null, width = null }: Props): ReactElement {
	const text = `${process.env.FRAMER_BASE_URL}/${access}?auth=${auth}`;

	return (
		<React.Fragment>
			<div>
				<b>Overlay Frame Source</b>
			</div>
			<Paragraph copyable={{ text }}>{text}</Paragraph>
			{height && width && <Paragraph>
				Empfohlene Browser-Source Größe: 
				<ul>
					<li>Breite: {width}px</li>
					<li>Höhe: {height}px</li>
				</ul>
			</Paragraph>}
		</React.Fragment>
	);
});