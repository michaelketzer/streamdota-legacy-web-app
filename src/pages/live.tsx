import { ReactElement, useState } from "react";
import PageFrame from "../components/PageFrame";
import ContextProvider from "../components/context/websocket/context";
import { initialState, reducer } from "../components/context/websocket/state";
import { useCurrentUser } from "../hooks/currentUser";
import PageHeader from "../components/PageHeader";
import getWebsocketUrl from "../modules/Router";
import LiveFeed from "../components/pages/live/LiveFeed";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../i18n";
import dynamic from "next/dynamic";



const LeagueIdSelector = dynamic(
    () => import('../components/pages/live/LeagueIdSelector'),
    { ssr: false }
);

const Live = ({t}: WithTranslation): ReactElement => {
    const user = useCurrentUser();
    const [leagueId, setLeagueId] = useState('12413');
    
    return <PageFrame title={'Live Feed'}>
        <PageHeader 
            additional={<div>
                <LeagueIdSelector leagueId={leagueId} setLeagueId={setLeagueId} />
            </div>}
            title={t('liveFeed-title')} 
            description={t('liveFeed-title-sub')} />

        {user && <ContextProvider initialState={initialState} reducer={reducer} url={'wss://api.streamdota.com/dota-gsi/live/81f8c9aa-ed7b-47be-8f17-9ad01cb472dd'}>
            <LiveFeed apiKey={user.frameApiKey} leagueId={leagueId} />
        </ContextProvider>}
    </PageFrame>
}


Live.getInitialProps = async () => ({
    namespacesRequired: ['liveFeed', 'nav'],
});

export default i18nInstance.withTranslation('liveFeed')(Live);
