import { ReactElement } from "react";
import PageFrame from "../components/PageFrame";
import ContextProvider from "../components/context/websocket/context";
import { initialState, reducer } from "../components/context/websocket/state";
import { useCurrentUser } from "../hooks/currentUser";
import SetupGsi from "../components/pages/dashboard/SetupGsi";
import { Typography } from "antd";
import getWebsocketUrl from "../modules/Router";
import i18nInstance, { TransFN } from "../i18n";
import { wrapper } from "../modules/Store";

const Dashboard = ({t}: {t: TransFN}): ReactElement => {
    const user = useCurrentUser();
    
    return <PageFrame title={'Dashboard'}>
        <div className={'lastNews'}>

            <Typography.Title level={3}>{t('gsi-header')}</Typography.Title>
            <p className={'desc'}>{t('gsi-header-sub')}</p>

            <p className={'subDesc'}>{t('gsi-header-desc')} <a href={'https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration'}>valvesoftware.com</a></p>
                    
            <br />
            <p className={'important'}>{t('gsi-notice')}</p>
            {user && user.frameApiKey && <ContextProvider initialState={initialState} reducer={reducer} url={getWebsocketUrl() + '/dota-gsi/logs/' + user.frameApiKey}>
                <SetupGsi gsiAuth={user.gsiAuth} gsiConnected={user.gsiConnected} />
            </ContextProvider>}
        </div>

        <style jsx>{`
            .important {
                font-size: 16px;
            }
        `}</style>
    </PageFrame>
}

Dashboard.getInitialProps = async () => ({
    namespacesRequired: ['dashboard', 'nav'],
});

export default wrapper.withRedux(i18nInstance.withTranslation('dashboard')(Dashboard));