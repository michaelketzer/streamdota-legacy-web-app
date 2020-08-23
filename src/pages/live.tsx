import { ReactElement, useState } from "react";
import PageFrame from "../components/PageFrame";
import ContextProvider from "../components/context/websocket/context";
import { initialState, reducer } from "../components/context/websocket/state";
import { useCurrentUser } from "../hooks/currentUser";
import PageHeader from "../components/PageHeader";
import { Alert } from "antd";
import getWebsocketUrl from "../modules/Router";
import LiveFeed from "../components/pages/live/LiveFeed";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../i18n";
import dynamic from "next/dynamic";
import { wrapper } from "../modules/Store";



const LeagueIdSelector = dynamic(
    () => import('../components/pages/live/LeagueIdSelector'),
    { ssr: false }
);

const Live = ({t}: WithTranslation): ReactElement => {
    const user = useCurrentUser();
    const [leagueId, setLeagueId] = useState(0);
    
    return <PageFrame title={'Live Feed'}>
        <PageHeader 
            title={t('liveFeed-title')} 
            description={t('liveFeed-title-sub')} />

        <Alert message={
            <>
                {t('league-info-start')} <span className={'highlight'}>https://stratz.com/leagues</span>{t('league-info-end')} https://stratz.com/leagues/<span className={'highlight'}>11629</span>
            </>
        } type="info" />

        <div className={'leagueId'}>
            <LeagueIdSelector leagueId={leagueId} setLeagueId={setLeagueId} />
        </div>

        {user && <ContextProvider initialState={initialState} reducer={reducer} url={getWebsocketUrl() + '/dota-gsi/live/' + user.frameApiKey}>
            <LiveFeed apiKey={user.frameApiKey} leagueId={leagueId} />
        </ContextProvider>}

        <style jsx>{`
            .highlight {
                color: #1890FF;
            }

            .leagueId {
                margin: 30px 0;
                display: inline-block;
            }
        `}</style>
    </PageFrame>
}


Live.getInitialProps = async () => ({
    namespacesRequired: ['liveFeed', 'nav'],
});

export default wrapper.withRedux(i18nInstance.withTranslation('liveFeed')(Live));