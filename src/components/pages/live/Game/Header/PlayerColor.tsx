import classNames from "classnames";
import { ReactElement } from "react";


export default function PlayerColor({idx}: {idx: number}): ReactElement {
    return <div className={classNames('playerColor', `color-${idx}`)}>
        <style jsx>{`
            .playerColor {
                height: 8px;
                width: 100%;
                box-shadow: inset 0px 0px 4px 0px rgba(0,0,0,0.5);
            }

            .color-0 {
                background-color: #3074F9;
            }
            .color-1 {
                background-color: #66FFC0;
            }
            .color-2 {
                background-color: #BD00B7;
            }
            .color-3 {
                background-color: #F8F50A;
            }
            .color-4 {
                background-color: #FF6901;
            }
            .color-5 {
                background-color: #FF88C5;
            }
            .color-6 {
                background-color: #A2B349;
            }
            .color-7 {
                background-color: #63DAFA;
            }
            .color-8 {
                background-color: #01831F;
            }
            .color-9 {
                background-color: #9F6B00;
            }
        `}</style>
    </div>

}