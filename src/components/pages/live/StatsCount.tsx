import { ReactNode, ReactElement } from "react";


export default function StatsCount({children, label}: {children: ReactNode; label: string}): ReactElement {
    return <div className={'count'}>
        <div className={'value'}>{children}</div>
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
                font-size: 14px;
                text-transform: uppercase;
                color: #999;
            }
        `}</style>
    </div>
}