import React, { ReactElement } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import i18nInstance from '../../../../i18n';
import { WithTranslation } from 'next-i18next';

interface Props extends WithTranslation {
	access: string; 
	auth: string;

	height?: number | null;
	width?: number | null;
	testing?: boolean;
}

const FrameLink = ({ t, access, auth, height = null, width = null, testing }: Props): ReactElement => {
	const text = `${process.env.FRAMER_BASE_URL}/${access}?auth=${auth}`;
	const test = text + '&testing=true';

	return (
		<React.Fragment>
			<div>
				<b>{t('overlay-source-title')}</b>
			</div>
			<Paragraph copyable={{ text }}>{text}</Paragraph>
			{testing && <>
				<div>
					<b>{t('overlay-source-test')}</b>
				</div>
				<Paragraph copyable={{ text: test  }}>{test}</Paragraph>
			</>}
			{height && width && <Paragraph>
				{t('overlay-source-suggested-size')} 
				<ul>
					<li>{t('overlay-source-suggested-height')}: {width}px</li>
					<li>{t('overlay-source-suggested-width')}: {height}px</li>
				</ul>
			</Paragraph>}
		</React.Fragment>
	);
}

export default i18nInstance.withTranslation('dotaWL')(FrameLink);