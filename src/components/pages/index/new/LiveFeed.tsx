import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Row from "./Row";
import Sub from "./Sub";
import ContentTitle from "./ContentTitle";
import Highlight from "./Highlight";


export default function LiveFeed(): ReactElement {
    return <Frame grey>
        <Title>Casting tool - live feed</Title>
        <SubTitle>Access data of picks & bans quickly and overwhelm your audience with simple, yet powerful stats</SubTitle>
        <Row>
            <img src={'/images/preview/liveFeed.png'} />
            <Sub>
                <ContentTitle>Features</ContentTitle>
                <ul>
                    <li><Highlight>League</Highlight> you decide which source league is used to gather stats</li>
                    <li><Highlight>Automatic</Highlight> picks & bans of captains mode games are instantly available</li>
                    <li><Highlight>Overlay</Highlight> by a click an overlay is shown at the stream to display the data directly to your viewers</li>
                </ul>
            </Sub>
        </Row>

        <style jsx>{`
            img {
                max-width: 200px;
                width: 100%;
                margin: 20px auto;
                border-radius: 8px;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.1);
            }
        `}</style>
    </Frame>;
}