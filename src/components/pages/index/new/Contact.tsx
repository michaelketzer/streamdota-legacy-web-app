import { ReactElement } from "react";
import Frame from "./Frame";


export default function Contact(): ReactElement {
    return <Frame blue>
        <div className={'getInTouch'}>
            You are interested and want to get in touch?

            <a className={'discord'} href={'https://discord.gg/EYRQUaz'} target={'_blank'}>Join our Discord</a>
        </div>

        <style jsx>{`
            .getInTouch {
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: space-evenly;
                font-size: 20px;
                flex-wrap: wrap;
            }

            .discord {
                border-radius: 4px;
                background-color: #7289da;
                cursor: pointer;
                height: 30px;;
                line-height: 30px;
                color: #FFF;
                font-size: 12px;
                font-weight: bold;
                padding: 0 10px;
            }
        `}</style>
    </Frame>;
}