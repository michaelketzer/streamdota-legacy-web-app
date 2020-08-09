import { ReactElement } from "react";
import BetContext from "../../components/pages/bets/BetContext/Context";
import OverlayTimer from "../../components/pages/frames/betting/OverlayTimer";
import Slider from "../../components/pages/frames/betting/Slider";
import Toplist from "../../components/pages/frames/betting/Toplist";

function DotaOverlay({auth, type}: {auth: string, type: 'slider' | 'timer' | 'toplist'}): ReactElement {
    return <BetContext auth={auth}>
        <>
            {type === 'timer' && <OverlayTimer auth={auth} />}
            {type === 'slider' && <Slider auth={auth} />}
            {type === 'toplist' && <Toplist auth={auth} />}
        </>
    </BetContext>;
}

DotaOverlay.getInitialProps = ({query: {auth, type}}) => {
    return {auth, type};
}

export default DotaOverlay;