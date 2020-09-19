import classNames from "classnames";
import { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;
    color: 'yellow' | 'blue' | 'green';
}

export default function Value({children, color}: Props): ReactElement {
    return <div className={classNames('value', color)}>
        {children}

        <style jsx>{`
            .value {
                font-weight: bold;
                font-size: 22px;
                color: #555;
            }    

            .yellow {
                color: #FF9900;
            }
        `}</style>
    </div>;
}