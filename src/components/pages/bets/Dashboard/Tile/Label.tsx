import classNames from "classnames";
import { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function Label({children}: Props): ReactElement {
    return <div className={classNames('label')}>
        {children}

        <style jsx>{`
            .label {
                font-weight: bold;
                font-size: 12px;
                color: #999;
                text-transform: uppercase;
            }    
        `}</style>
    </div>;
}