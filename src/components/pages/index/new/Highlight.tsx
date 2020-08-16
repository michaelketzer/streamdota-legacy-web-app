import { ReactElement } from "react";


export default function Highlight({children}: {children: string}): ReactElement {
    return <span className={'highlight'}>
        {children}
        <style jsx>{`
            .highlight {
                color: #fa7035;
                font-weight: bold;
            }
        `}</style>
    </span>
}