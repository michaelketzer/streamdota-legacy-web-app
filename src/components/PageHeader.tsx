import { Typography } from "antd";
import { ReactElement } from "react";

interface Props {
    title: string;
    description: string;
    previewSr?: string;
}

export default function PageHeader({title, description, previewSr}: Props): ReactElement {
    return <div className={'header'}>
        <div>
            <Typography.Title>{title}</Typography.Title>
            <div className={'pageDescription'}>{description}</div>
        </div>
        {previewSr && <img src={previewSr} alt={'preview'} height={'100px'} />}

        <style jsx>{`
            .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            .pageDescription {
                margin-top: -20px;
                margin-bottom: 20px;
            }
        `}</style>
    </div>;
}