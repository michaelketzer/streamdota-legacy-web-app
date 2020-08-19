import { ReactElement } from 'react';
import { Tabs } from 'antd';
import Stats from './Stats';
import OverlaySetup from './OverlaySetup';
import Commands from './Commands';
import { useCurrentUser } from '../../../hooks/currentUser';
import i18nInstance from '../../../i18n';
import { WithTranslation } from 'next-i18next';

const DotaWLTabs = ({t}: WithTranslation): ReactElement => {
	const user = useCurrentUser();

	return (
		<Tabs defaultActiveKey='1' animated={false}>
			<Tabs.TabPane tab={t('tab-settings')} key='1'>
				<Stats />
			</Tabs.TabPane>

			<Tabs.TabPane tab={t('tab-commands')} key='2'>
				<Commands />
			</Tabs.TabPane>

			<Tabs.TabPane tab={t('tab-overlay')} key='3'>
				<OverlaySetup />
			</Tabs.TabPane>
		</Tabs>
	);
}

export default i18nInstance.withTranslation('dotaWL')(DotaWLTabs);