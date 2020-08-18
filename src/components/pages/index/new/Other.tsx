import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Row from "./Row";
import Sub from "./Sub";
import Highlight from "./Highlight";


export default function Other(): ReactElement {
    return <Frame>
        <Title>and much more...</Title>
        <SubTitle>A small list of stuff worth mentioning</SubTitle>
        <Row>
            <Sub>
                <ul>
                    <li><Highlight>Free</Highlight> streamdota.com is a hobby project and has no intention earning money. <br />Its free and will always be.</li>
                    <li><Highlight>Secure</Highlight> security made simple. <br />We do not save data aside any public accessable data</li>
                    <li><Highlight>Open Source</Highlight> all this is open source at https://gitlab.com/streamdota</li>
                    <li><Highlight>Fast</Highlight> who hates waiting? We do too. <br />So we create software that is fast by default</li>
                    <li><Highlight>Open minded</Highlight> you have an idea? Join our discord and discuss it with us. <br />We are happy to add more exiting stuff and features</li>
                    <li><Highlight>Dota</Highlight> we simple love it - creating content for it and playing is a passion for almost 15 years now</li>
                </ul>
            </Sub>
            <img src={'/images/present_watermark.png'} />
        </Row>

        <style jsx>{`
            img {
                max-width: 200px;
                width: 100%;
                margin: 20px auto;
            }
        `}</style>
    </Frame>;
}