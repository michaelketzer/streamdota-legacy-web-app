import { ReactElement } from "react";

interface Props {
    value: string;
    label: string;
}

export default function SimpleValueTile({value, label}: Props): ReactElement {
    return <div className={'valueWrapper'}>
        <div className={'value'}>{value}</div>
        <div className={'label'}>{label}</div>

        <style jsx>{`
            .valueWrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                height: 108px;
            }    

            .value {
                color: #595959;
                font-size: 32px;
                line-height: 42px;
                font-weight: 500; 
            }

            .label {
                font-size: 16px;
                line-height: 24px;
                text-align: center;
                color: #8C8C8C;
            }
        `}</style>
    </div>;
}