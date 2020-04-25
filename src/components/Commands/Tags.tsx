import { ReactElement, useMemo } from "react";
import { Tag } from "antd";

interface Props {
    tags: string[];
}

export default function Tags({tags}: Props): ReactElement {
    const fullTags = useMemo(() => ['user', ...tags], [tags]);

    return <div className={'variableTags'}>
        {fullTags.map((tag) => <Tag key={tag}>{`{${tag.toUpperCase()}}`}</Tag>)}

        <style jsx>{`
            .variableTags {
                display: flex;
                align-items: center;
                margin: 10px 0 32px;
                flex-wrap: wrap;
            }
        `}</style>
    </div>;
}