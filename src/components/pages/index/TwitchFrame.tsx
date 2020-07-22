import { ReactElement, ReactNode } from "react";
import TwitchChat, { Chat } from "./TwitchChat";

interface Props {
    children: ReactNode;
    chats: Chat[];
    startChat: boolean;
}

export default function TwitchFrame({chats, children, startChat}: Props): ReactElement {
    return <div className={'streamWrapper'}>
        <div className={'mainContent'}>
            <div className={'stream'}>
                {children}
            </div>
            <div className={'streamerDetails'}>
                <div className={'streamerWrapper'}>
                    <div className={'avatar'} />
                    <div className={'streamInfo'}>
                        <div className={'title'} />
                        <div className={'streamer'} />
                    </div>
                </div>

                <div className={'buttons'}>
                    <div className={'follow'} />
                    <div className={'subscribe'} />
                </div>
            </div>
        </div>
        <div className={'chat'}>
            <div>
                {startChat && <TwitchChat chats={chats} />}
            </div>
        </div>

        <style jsx>{`
            .streamWrapper {
                height: 100%;
                display: flex;
                align-items: stretch;
            }

            .mainContent {
                flex-grow: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: stretch;
            }

            .stream {
                aspect-ratio: 16 / 9;
                flex-shrink: 0;
                flex-grow: 1;
                position: relative;
            }

            .streamerDetails {
                flex: 0;
                display: flex;
                align-items: center;
                padding: 1rem 2rem;
                justify-content: space-between;
            }

            .streamerWrapper {
                display: flex;
                align-items: center;
                flex-grow: 1;
                flex-shrink: 0;
            }

            .chat {
                width: 22rem;
                flex-shrink: 0;
                padding: 1rem 2rem;
                display: flex;
                flex-direction: column;
                justify-content:space-between;
                align-items: stretch;
            }

            .streamInfo {
                flex-grow: 1;
                height: 100%;
                width: 100%;
            }

            .avatar {
                height: 4.5rem;
                width: 4.5rem;
                background-color: #DDD;
                margin-right: 10px;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .title {
                height: 1.2rem;
                width: 50%;
                background-color: #DDD;
            }

            .streamer {
                margin-top: .5rem;
                height: 1rem;
                width: 10%;
                background-color: #DDD;
            }

            .buttons {
                align-self: flex-start;
                justify-self: flex-end;
                display: flex;
            }

            .follow {
                height: 2rem;
                width: 6rem;
                background-color: #9147ff;
                border-radius: 4px;
                margin-right: .75rem;
            }

            .subscribe {
                height: 2rem;
                width: 10rem;
                background-color: #9147ff;
                border-radius: 4px;
            }
        `}</style>
    </div>;
}