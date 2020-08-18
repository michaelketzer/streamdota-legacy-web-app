import { ReactElement, ReactNode } from "react";
import classNames from "classnames";

interface Props {
    blue?: boolean;
    children: ReactNode;
    grey?: boolean;
    orange?: boolean;
    id?: string;
}

export default function Frame({blue, children, grey, id, orange}: Props): ReactElement {
    return <div className={classNames('wrapper', {blue, grey, orange})}>
        <div className={'frame'} id={id}>
            {children}
        </div>
        <style jsx>{`
            .grey {
                background-color: #eee;
            }

            .blue {
                background-color: #f2fcff;
            }

            .orange {
                background-color: #fff8f2;
            }

            .frame {
                max-width: 1200px;
                width: 100%;
                padding: 8rem 20px;
                margin: 0 auto;
            }
        `}</style>
    </div>
}