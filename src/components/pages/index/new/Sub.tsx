import { ReactElement, ReactNode } from "react";

export default function Sub({children}: {children: ReactNode}): ReactElement {
    return <div>
        {children}

        <style jsx>{`
            div {
                margin-top: 2rem;
                font-size: 16px;
            }
        `}</style>
    </div>;
}