import { ReactElement } from 'react';
import { Tabs } from 'antd';
import Configuration from './Configuration';
import Stats from './Stats';
import OverlaySetup from './OverlaySetup';
import Commands from './Commands';
import { useCurrentUser } from '../../../hooks/currentUser';

export default function DotaWLTabs(): ReactElement {
	const user = useCurrentUser();

	return (
		<Tabs defaultActiveKey='1' animated={false}>
			<Tabs.TabPane tab='Basis Konfiguration' key='1'>
				<Configuration />
			</Tabs.TabPane>

			<Tabs.TabPane tab='Stats Einstellungen' key='3'>
				<Stats />
			</Tabs.TabPane>

			<Tabs.TabPane tab='TinkBot Command' key='4'>
				<Commands />
			</Tabs.TabPane>

			<Tabs.TabPane tab='Overlay Einstellungen' key='5'>
				<OverlaySetup />
			</Tabs.TabPane>
		</Tabs>
	);
}
