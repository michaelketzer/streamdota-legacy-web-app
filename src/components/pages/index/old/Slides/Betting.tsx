import { ReactElement, useState } from "react";
import ReactPlayer from 'react-player'
import TwitchFrame from "../TwitchFrame";
import { Chat } from "../TwitchChat";
import BettingSlider from "./BettingSlider";

const chats: Chat[] = [{
    streamer: true,
    delay: 3,
    message: '!startbet',
    mod: false,
    nameLength: 5,
}, {
    streamer: false,
    delay: 3.2,
    message: 'Bets are open now! You can bet with \'!win\' or \'!loose\'.',
    mod: true,
    nameLength: 7,
}, {
    streamer: false,
    delay: 3.5,
    message: '!win',
    mod: false,
    nameLength: 8,
}, {
    streamer: false,
    delay: 4,
    message: '!win',
    mod: false,
    nameLength: 4,
}, {
    streamer: false,
    delay: 5,
    message: '!win',
    mod: false,
    nameLength: 5,
}, {
    streamer: false,
    delay: 5.5,
    message: '!loose',
    mod: false,
    nameLength: 3,
}, {
    streamer: false,
    delay: 5.7,
    message: '!win',
    mod: false,
    nameLength: 5,
}, {
    streamer: false,
    delay: 7,
    message: '!win',
    mod: true,
    nameLength: 7,
}, {
    streamer: false,
    delay: 9,
    message: '!win',
    mod: false,
    nameLength: 4,
}, {
    streamer: false,
    delay: 11,
    message: '!loose',
    mod: false,
    nameLength: 6,
}, {
    streamer: false,
    delay: 13,
    message: '!win',
    mod: false,
    nameLength: 5,
}, {
    streamer: false,
    delay: 13.2,
    message: 'Bets are closed now.',
    mod: true,
    nameLength: 7,
}, {
    streamer: false,
    delay: 14,
    message: '!win',
    mod: false,
    nameLength: 8,
}]

export default function Betting(): ReactElement {
    const [live, setLive] = useState(false);
    return <TwitchFrame chats={chats} startChat={live}>
        <div className={'videoOverlay'}>
            <ReactPlayer url={'/videos/bet_background.mp4'} muted={true} volume={1} width={'100%'} height={'100%'} autoPlay playsinline playing onPlay={() => setLive(true)}/>
        </div>

        {live && <BettingSlider />}

        <style jsx>{`
            .videoOverlay {
                position: relative;
                height: 100%;
                width: 100%;
            }

            .videoOverlay::after {
                position: absolute;
                top: 0;
                bottom: 6px;
                left: 0;
                right: 0;
                background-color: rgba(0,0,0,.2);
                content: ' ';
                background:
                    radial-gradient(rgba(0,0,0,.3) 75%, transparent 75%) 0 1px,
                    radial-gradient(rgba(0,0,0,.3) 75%, transparent 75%) 8px 9px;
                background-size: 4px 4px;
                
            }
        
        `}</style>
    </TwitchFrame>;
}