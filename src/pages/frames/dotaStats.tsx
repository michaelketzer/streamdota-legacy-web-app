import { ReactElement } from "react";
import { ContextProvider } from "../../components/context/websocket/context";
import { initialState, reducer } from "../../components/context/websocket/state";
import DotaStats from "../../components/pages/frames/dotaStats/DotaStats";

function DotaOverlay({auth}: {auth: string}): ReactElement {
    return <ContextProvider initialState={initialState} reducer={reducer} url={'wss://api.streamdota.de/dota-gsi/live/' + auth}>
        <DotaStats />
    </ContextProvider>;
}

DotaOverlay.getInitialProps = ({query: {auth}}) => {
    return {auth};
}

export default DotaOverlay;