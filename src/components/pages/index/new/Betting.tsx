import { ReactElement } from "react";
import Frame from "./Frame";
import Title from "./Title";
import Sub from "./Sub";
import SubTitle from "./SubTitle";
import ContentTitle from "./ContentTitle";
import Row from "./Row";
import Highlight from "./Highlight";


export default function Betting(): ReactElement {
    return <Frame grey>
        <Title>Bet System</Title>
        <SubTitle>Let your viewers interact with your games by betting on teams, your win or loss and much more...</SubTitle>
        <Row>
            <img src={'/images/landingPreview/betsystem.jpg'} />
            <Sub>
                <ContentTitle>Features</ContentTitle>
                <ul>
                    <li><Highlight>Seasons</Highlight> group bets to seasons to switch between events</li>
                    <li><Highlight>Invites</Highlight> share seasons with other streamers and create merged toplists</li>
                    <li><Highlight>Control</Highlight> easily start bettings or set winners from chat, <br />dashboard or even your stream deck</li>
                    <li><Highlight>Customizable</Highlight> match any overlays or chat commands your stream</li>
                    <li><Highlight>Automatic</Highlight> winners are determined automatically</li>
                </ul>
            </Sub>
        </Row>

        <style jsx>{`
            img {
                margin: 20px auto;
                border-radius: 8px;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.1);
            }
        `}</style>
    </Frame>;
}