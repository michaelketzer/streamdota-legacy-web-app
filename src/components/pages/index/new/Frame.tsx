import { ReactElement, ReactNode } from "react";

export default function Frame({children, id}: {children: ReactNode; id?: string;}): ReactElement {
    return <div className={'frame'} id={id}>
        {children}
        <style jsx>{`
            .frame {
                max-width: 1200px;
                width: 100%;
                padding: 8rem 20px;
                margin: 0 auto;
            }
        `}</style>
    </div>
}