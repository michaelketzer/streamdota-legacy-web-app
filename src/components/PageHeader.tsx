import { Typography } from "antd";
import { ReactElement } from "react";

interface Props {
    title: string;
    description: string;
}

export default function PageHeader({title, description}: Props): ReactElement {
    return <div>
        <Typography.Title>{title}</Typography.Title>
        <div className={'pageDescription'}>{description}</div>

        <style jsx>{`
            .pageDescription {
                margin-top: -20px;
                margin-bottom: 20px;
            }
        `}</style>
    </div>;
}