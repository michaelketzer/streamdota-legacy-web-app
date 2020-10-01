import { ReactElement } from "react";

interface Props {
    mana: number;
}
export default function PlayerMana({mana}: Props): ReactElement {
    return <div className={'mana'}>
        <div className={'bar'} style={{width: mana + '%'}} />

        <style jsx>{`
            .mana {
                height: 6px;
                width: 100%;
                box-shadow: inset 0px 0px 4px 0px rgba(0,0,0,0.5);
                position: relative;
                overflow: hidden;
            }

            .bar {
                background-color: #279be3;
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