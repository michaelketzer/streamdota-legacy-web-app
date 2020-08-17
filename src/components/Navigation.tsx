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
} from '@ant-design/icons';

interface MenuItem {
    icon: ReactNode;
    name: string;
    path: string;
}

const items: MenuItem[] = [{
    icon: <DashboardOutlined />,    
    name: 'Dashboard',
    path: '/dashboard'
}, {
    icon: <RobotOutlined />,
    name: 'TinkBot',
    path: '/bot'
}, {
    icon: <LineChartOutlined />,    
    name: 'Dota W/L',
    path: '/dotaWL'
}, {
    icon: <PieChartOutlined />,
    name: 'Wettsytem',
    path: '/bets',
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
        </Menu>
    </nav>;
}