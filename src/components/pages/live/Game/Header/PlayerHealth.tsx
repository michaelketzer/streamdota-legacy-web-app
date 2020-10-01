import { ReactElement } from "react";

interface Props {
    health: number;
}
export default function PlayerHealth({health}: Props): ReactElement {
    return <div className={'health'}>
        <div className={'bar'} style={{width: health + '%'}} />

        <style jsx>{`
            .health {
                height: 6px;
                width: 100%;
                box-shadow: inset 0px 0px 4px 0px rgba(0,0,0,0.5);
                position: relative;
                overflow: hidden;
            }

            .bar {
                background-color: #1bcf2d;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                z-index: -1;
                transition: width 120ms ease-in-out;
            }
        `}</style>
    </div>;
} 