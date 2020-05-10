import { ReactElement } from "react";
import { Tabs } from "antd";
import Configuration from "./Configuration";
import SetupGsi from "./SetupGsi";
import Stats from "./Stats";
import OverlaySetup from "./OverlaySetup";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { User } from "../../../api/@types/User";
import { fetchCurrentUser } from "../../../api/user";
import { initialState, reducer } from "../../context/websocket/state";
import ContextProvider from "../../context/websocket/context";
import Commands from "./Commands";


export default function DotaWLTabs(): ReactElement {
    const [user, reload] = useAbortFetch<User>(fetchCurrentUser);
    
    return <Tabs defaultActiveKey="1" animated={false}>
        <Tabs.TabPane tab="Basis Konfiguration" key="1">
            <Configuration />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Dota GSI Konfiguration" key="2">
            <ContextProvider initialState={initialState} reducer={reducer} url={'wss://api.streamdota.de/dota-gsi/logs/' + (user && user.frameApiKey)}>
                <SetupGsi gsiAuth={user && user.gsiAuth} gsiConnected={user && user.gsiConnected} reload={reload}/>
            </ContextProvider>

        </Tabs.TabPane>

        <Tabs.TabPane tab="Stats Einstellungen" key="3">
            <Stats />
        </Tabs.TabPane>

        <Tabs.TabPane tab="TinkBot Command" key="4">
            <Commands />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Overlay Einstellungen" key="5">
            <OverlaySetup />
        </Tabs.TabPane>
    </Tabs>
}