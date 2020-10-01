import { Tabs } from "antd";
import { WithTranslation } from "next-i18next";
import { ReactElement, useEffect, useState } from "react";
import i18nInstance from "../../../i18n";
import { useMessageListener } from "../../context/websocket/MessageHandler";
import { GameState, isGsiGameStateMessage, isRoshanMessage } from "../../context/websocket/state";
import Draft from "./Draft/Draft";
import Game from "./Game/Game";
import Overlay from "./Overlay/Overlay";


interface Props extends WithTranslation {
    apiKey: string;
    leagueId: string;
}

type Tabs = 'draft' | 'game' | 'overlay';

const draftStates = new Set([
    GameState.heroSelection,
    GameState.mapLoading,
    GameState.playersLoading,
    GameState.strategyTime
]);

const LiveFeed = ({t}: Props): ReactElement => {
    const [tab, setTab]  = useState<Tabs>('draft');

    const [gameState, setGameState] = useState<GameState | null>(null);
    const message = useMessageListener();
    useEffect(() => {
        if(message && isGsiGameStateMessage(message)) {
            setGameState(message.value);
        }
    }, [message]);

    useEffect(() => {
        if(!gameState || draftStates.has(gameState)) {
            setTab('draft')
        } else {
            setTab('game');
        }
    }, [gameState]);

    return <Tabs activeKey={tab} animated={false} destroyInactiveTabPane onChange={(key) => setTab(key as Tabs)}>
        <Tabs.TabPane tab={t('livefeed-tab-draft')} key={'draft'}>
            <div className={'content'}>
                <Draft />
            </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('livefeed-tab-game')} key={'game'}>
            <div className={'content'}>
                <Game />
            </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('livefeed-tab-overlay')} key={'overlay'}>
            <div className={'content'}>
                <Overlay />
            </div>
        </Tabs.TabPane>

        <style jsx>{`
            .content {
                padding: 0 20px 20px 20px;
            }    
        `}</style>
    </Tabs>;
}

export default i18nInstance.withTranslation('livefeed')(LiveFeed);
