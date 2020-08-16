import { ReactElement, ReactNode } from "react";

export default function SubTitle({children}: {children: ReactNode}): ReactElement {
    return <h3>
        {children}

        <style jsx>{`
            h3 {
                font-size: 20px;
                font-weight: bold;
            }
        `}</style>
    </h3>;
}