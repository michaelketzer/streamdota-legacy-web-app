import { ReactElement, ReactNode } from "react";

export default function Title({children}: {children: ReactNode}): ReactElement {
    return <h2>
        {children}

        <style jsx>{`
            h2 {
                font-size: 30px;
                text-transform: uppercase;
                font-weight: bold;
            }
        `}</style>
    </h2>;
}