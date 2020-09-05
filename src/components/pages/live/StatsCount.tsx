import { ReactNode, ReactElement } from "react";
import classNames from "classnames";

interface Props {
    children: ReactNode;
    label: string;
    valueColor?: 'green' | 'red';
}

export default function StatsCount({children, label, valueColor}: Props): ReactElement {
    return <div className={'count'}>
        <div className={classNames('value', valueColor)}>{children}</div>
        <div className={'label'}>{label}</div>

        <style jsx>{`
            .count {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: 100%;
                padding: 0 30px;
            }

            .value {
                font-size: 25px;
                font-weight: bold;
            }

            .label {
                font-size: 20px;
                text-transform: uppercase;
                color: #999;
            }

            .green {
                color: #2dbb19;
            }

            .red {
                color: #e81615;
            }
        `}</style>
    </div>
}