import { ReactElement } from "react";
import { useCurrentUser } from "../../../../hooks/currentUser";
import FrameLink from "../../dotaOverlay/Overlay/FrameLink";


export default function Overlay(): ReactElement {
    const user = useCurrentUser();
    return <>
        <FrameLink auth={user ? user.frameApiKey : ''} testing access={'casting/draftStats'} height={70} width={500} />
    </>;
}