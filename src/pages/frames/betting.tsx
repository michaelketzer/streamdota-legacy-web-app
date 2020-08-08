import { ReactElement } from "react";
import BetContext from "../../components/pages/bets/BetContext/Context";
import OverlayTimer from "../../components/pages/frames/betting/OverlayTimer";

function DotaOverlay({auth, type}: {auth: string, type: 'slider' | 'timer' | 'toplist'}): ReactElement {
    return <BetContext auth={auth}>

        {type === 'timer' && <OverlayTimer auth={auth} />}
    </BetContext>;
}

DotaOverlay.getInitialProps = ({query: {auth, type}}) => {
    return {auth, type};
}

export default DotaOverlay;