import { ReactElement, ReactNode } from "react";



export default function Row({children}: {children: ReactNode}): ReactElement {
    return <div className={'row'}>
        {children}

        <style jsx>{`
            .row {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0 30px;
            }
        `}</style>
    </div>
}
