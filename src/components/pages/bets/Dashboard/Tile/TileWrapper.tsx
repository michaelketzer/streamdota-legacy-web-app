import { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function Tile({children}: Props): ReactElement {
    return <div className={'tile'}>
        {children}

        <style jsx>{`
            .tile {
                background-color: #FFF;
                box-shadow: 2px 2px 15px 0 rgba(0,0,0,.2);
                min-width: 150px;
                min-height: 100px;
                display: flex;
                align-items: stretch
            }
        `}</style>
    </div>
}