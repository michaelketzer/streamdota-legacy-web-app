import { ReactElement } from "react";
import { motion } from "framer-motion";

export interface Chat {
    streamer: boolean;
    mod: boolean;
    message: string;
    delay: number;
    nameLength: number;
}

interface Props {
    chats: Chat[];
}

export default function TwitchChat({chats}: Props): ReactElement {
    return <>
        <div className={'welcome'}>Welcome to the chat!</div>
        {chats.map((chat, idx) => <motion.div key={idx} initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0, transition: {delay: chat.delay}}}>
            <div className={'chat'}>
                {chat.streamer && <span className={'streamer'} />}
                {chat.mod && <span className={'mod'} />}
                <span className={'name'} style={{width: chat.nameLength + 'rem'}} />
                <span className={'message'}>{chat.message}</span>
            </div>
        </motion.div>)}

        <style jsx>{`
            .welcome {
                color: #AAA;
                margin-top: .5rem;
                margin-bottom: 1rem;
                font-size: .8rem;
            }

            .chat {
                margin-bottom: 5px;
            }

            .streamer, .mod, .name {
                height: 18px;
                width: 18px;
                display: inline-block;
                vertical-align: middle;
                border-radius: 0.1rem;
                margin-right: .3rem;
                margin-bottom: .2rem;
            }

            .streamer {
                background-color: #FF0000;
            }

            .mod {
                background-color: #00c100;
            }

            .name {
                background-color: #CCC;
                border-radius: .5rem;
            }
        `}</style>
    </>;
}