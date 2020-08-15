import { ReactElement } from "react";
import Link from "next/link";

export default function Header(): ReactElement {
    return <header>
        <div className={'inner'}>
            <div className={'logo'}>StreamDota</div>

            <Link href={'/login'}>
                <div className={'login'}>
                    Login with Twitch
                </div>
            </Link>
        </div>

        <style jsx>{`
            header {
                height: 60px;
                box-shadow: 0 2px 20px 0 rgba(0,0,0,.1);
                width: 100vw;
                position: sticky;
                top: 0;
                left: 0;
                right: 0;
                z-index: 5;
                background-color: #FFF;
            }

            .inner {
                max-width: 1024px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 100%;
                padding: 0 30px;
            }

            .login {
                border-radius: 4px;
                background-color: rgb(145, 71, 255);
                cursor: pointer;
                height: 30px;;
                line-height: 30px;
                color: #FFF;
                font-size: 12px;
                font-weight: bold;
                padding: 0 10px;
            }

            .login:hover {
                background-color: rgb(119, 44, 232);
            }

            .logo {
                font-size: 20px;
            }
        `}</style>
    </header>;
}