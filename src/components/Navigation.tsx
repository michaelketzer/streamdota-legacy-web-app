import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { Menu } from 'antd';
import {
  DashboardOutlined,
  RobotOutlined,
  LineChartOutlined,
  PieChartOutlined,
  AudioOutlined,
  EuroOutlined,
  DotChartOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface MenuItem {
    icon: ReactNode;
    name: string;
    path: string;
}

const items: MenuItem[] = [{
    icon: <DashboardOutlined />,    
    name: 'Allgemeint Einstellungen',
    path: '/dashboard'
}, {
    icon: <RobotOutlined />,
    name: 'StreamDota Bot',
    path: '/bot'
}, {
    icon: <PieChartOutlined />,
    name: 'Wettsytem',
    path: '/bets',
}];

const gamingItems: MenuItem[] = [{
    icon: <LineChartOutlined />,    
    name: 'Dota W/L',
    path: '/dotaWL'
}];

const castingItems: MenuItem[] = [{
    icon: <ClockCircleOutlined />,
    name: 'Roshan Countdown',
    path: '/roshTimer',
}, {
    icon: <DotChartOutlined />,
    name: 'Live Feed',
    path: '/live',
}/*, {
    icon: <EuroOutlined />,
    name: 'Sponsor Overlay',
    path: '/bets',
}*/];


export default function Navigation(): ReactElement {
    const router = useRouter();

    return <nav className={'navigation'}>
        <Menu mode={'inline'} defaultSelectedKeys={[router.pathname]}>
            {items.map((item) => <Menu.Item key={item.path} onClick={() => router.push(item.path)}>
                {item.icon}
                {item.name}
            </Menu.Item>)}

            <div className={'spacer'} />

            <Menu.ItemGroup title={'Gameplay Werkzeuge'}>
                {gamingItems.map((item) => <Menu.Item key={item.path} onClick={() => router.push(item.path)}>
                    {item.icon}
                    {item.name}
                </Menu.Item>)}
            </Menu.ItemGroup>

            <div className={'spacer'} />

            <Menu.ItemGroup title={'Kommentator Werkzeuge'}>
                {castingItems.map((item) => <Menu.Item key={item.path} onClick={() => router.push(item.path)}>
                    {item.icon}
                    {item.name}
                </Menu.Item>)}
            </Menu.ItemGroup>
        </Menu>

        <style jsx>{`
            .spacer {
                margin: 30px 0;
            }
        `}</style>
    </nav>;
}