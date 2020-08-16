import { ReactElement } from "react";
import Link from "next/link";

export default function Footer(): ReactElement {
    return <div className={'footer'}>
        <div className={'inner'}>
            <div className={'links'}>
                <Link href={'/dataPolicy'}>Data policy</Link>&nbsp;&nbsp;&nbsp;
                <Link href={'/imprint'}>Imprint</Link>
            </div>

            <div>
                StreamDota
            </div>
        </div>


        <style jsx>{`
            .footer {
                height: 40px;
                margin-top: 20px;
                background-color: #888;
                color: #FFF;
            }

            .inner {
                max-width: 1024px;
                width: 100%;
                margin: 0 auto;
                padding: 0 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 100%;
            }

            .links {
                display: flex;
                align-items: center;
            }

            .links :global(a) {
                color: #FFF!important;
                cursor: pointer;
            }
        `}</style>
    </div>
}