import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { Menu } from 'antd';
import {
  DashboardOutlined,
  RobotOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DotChartOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { WithTranslation } from "next-i18next";
import i18nInstance from "../i18n";

interface MenuItem {
    icon: ReactNode;
    name: string;
    path: string;
}

const items: MenuItem[] = [{
    icon: <DashboardOutlined />,    
    name: 'nav-general-settings',
    path: '/dashboard'
}, {
    icon: <RobotOutlined />,
    name: 'nav-general-bot',
    path: '/bot'
}, {
    icon: <PieChartOutlined />,
    name: 'nav-general-betsystem',
    path: '/bets',
}];

const gamingItems: MenuItem[] = [{
    icon: <LineChartOutlined />,    
    name: 'nav-general-dotaWL',
    path: '/dotaWL'
}];

const castingItems: MenuItem[] = [{
    icon: <ClockCircleOutlined />,
    name: 'nav-general-roshTimer',
    path: '/roshTimer',
}, {
    icon: <DotChartOutlined />,
    name: 'nav-general-liveFeed',
    path: '/live',
}/*, {
    icon: <EuroOutlined />,
    name: 'Sponsor Overlay',
    path: '/bets',
}*/];


const Navigation = ({t}: WithTranslation): ReactElement => {
    const router = useRouter();

    return <nav className={'navigation'}>
        <Menu mode={'inline'} defaultSelectedKeys={[router.pathname]}>
            {items.map((item) => <Menu.Item key={item.path} onClick={() => router.push(item.path)}>
                {item.icon}
                {t(item.name)}
            </Menu.Item>)}

            <div className={'spacer'} />

            <Menu.ItemGroup title={t('subHeader-gameplay')}>
                {gamingItems.map((item) => <Menu.Item key={item.path} onClick={() => router.push(item.path)}>
                    {item.icon}
                    {t(item.name)}
                </Menu.Item>)}
            </Menu.ItemGroup>

            <div className={'spacer'} />

            <Menu.ItemGroup title={t('subHeader-cast')}>
                {castingItems.map((item) => <Menu.Item key={item.path} onClick={() => router.push(item.path)}>
                    {item.icon}
                    {t(item.name)}
                </Menu.Item>)}
            </Menu.ItemGroup>
            <div className={'spacer'} />

            <Menu.ItemGroup title={t('subHeader-support')}>
                <Menu.Item key={'nav-support-support'}>
                    <UserAddOutlined />
                    <a href={'https://discord.gg/Xg5jD6V'} target={'_blank'}>{t('support')}</a>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>

        <style jsx>{`
            .spacer {
                margin: 30px 0;
            }
        `}</style>
    </nav>;
}

export default i18nInstance.withTranslation('nav')(Navigation);