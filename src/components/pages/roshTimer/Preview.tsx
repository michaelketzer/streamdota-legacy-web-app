import { RoshOverlay } from "@streamdota/shared-types";
import { ReactElement } from "react";
import Timer from "./Timer";


interface Props {
    overlay: RoshOverlay;
}

export default function Preview({overlay}: Props): ReactElement {

    return <div className={'preview'}>
        <div className={'faketimer faketimer2'}>
            <Timer overlay={overlay} state={'aegis'} />
        </div>
        <div className={'faketimer'}>
            <Timer overlay={overlay} />
        </div>
        <div className={'timer'}>
            <Timer overlay={overlay} state={'respawn_variable'}/>
        </div>


        <style jsx>{`
            .preview {
                width: 400px;
                height: 400px;
                background-image: url('/images/preview/roshTimer.png');
                background-size: cover;
                position: relative;
            }

            .faketimer {
                position: absolute;
                right: 64px;
                width: 64px;
                height: 30px;
                bottom: 218px;
                background-image: url('/images/preview/roshTimer_timeBG.png');
                background-repeat: no-repeat;
                object-fit: contain;
            }

            .faketimer2 {
                bottom: 248px;
            }

            .timer {
                position: absolute;
                right: 65px;
                width: 63px;
                height: 30px;
                bottom: 188px;
            }
        `}</style>
    </div>;
}