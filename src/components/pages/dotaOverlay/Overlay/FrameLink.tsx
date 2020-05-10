import { ReactElement } from "react";
import Paragraph from "antd/lib/typography/Paragraph";
import { User } from "../../../../api/@types/User";

export default function FrameLink({userData}: {userData: User | null}): ReactElement {
    const text = 'https://streamdota.com/frames/dotaStats?auth=' + (userData && userData.frameApiKey);

    return <>
        <div><b>Overlay Frame Source</b></div>
        <Paragraph copyable={{ text }}>{text}</Paragraph>
    </>;

}