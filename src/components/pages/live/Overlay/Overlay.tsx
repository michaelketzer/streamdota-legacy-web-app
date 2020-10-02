import { Typography } from "antd";
import { ReactElement } from "react";
import { useCurrentUser } from "../../../../hooks/currentUser";
import FrameLink from "../../dotaOverlay/Overlay/FrameLink";


export default function Overlay(): ReactElement {
    const user = useCurrentUser();
    return <>
    <Typography.Title>Draft Stats</Typography.Title>
    <FrameLink auth={user ? user.frameApiKey : ''} testing access={'casting/draftStats'} height={70} width={500} />
    <Typography.Title>Player Game Stats</Typography.Title>
    <FrameLink auth={user ? user.frameApiKey : ''} testing access={'casting/playerCompareStats'} height={1080} width={1920} />
    </>;
}