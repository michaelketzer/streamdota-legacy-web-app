import { ReactElement, ReactNode } from "react";

export default function ContentTitle({children}: {children: ReactNode}): ReactElement {
    return <h6>
        {children}

        <style jsx>{`
            h6 {
                font-size: 16px;
                font-weight: bold;
            }
        `}</style>
    </h6>;
}