import { RoshOverlay } from "@streamdota/shared-types";
import { ReactElement } from "react";
import Timer from "./Timer";


interface Props {
    overlay: RoshOverlay;
}

export default function Preview({overlay}: Props): ReactElement {

    return <div className={'preview'}>
        <div className={'timer'}>
            <Timer overlay={overlay} />
        </div>


        <style jsx>{`
            .preview {
                width: 400px;
                height: 400px;
                background-image: url('/images/preview/roshTimer.png');
                background-size: cover;
                position: relative;
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