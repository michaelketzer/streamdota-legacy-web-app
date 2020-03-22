import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from 'classNames';

interface MenuItem {
    icon: ReactNode;
    name: string;
    path: string;
}

const items: MenuItem[] = [{
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.25 1.25H2.75C1.92157 1.25 1.25 1.92157 1.25 2.75V13.25C1.25 14.0784 1.92157 14.75 2.75 14.75H13.25C14.0784 14.75 14.75 14.0784 14.75 13.25V2.75C14.75 1.92157 14.0784 1.25 13.25 1.25Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 4.25H4.25V11H6.5V4.25Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.75 4.25H9.5V8H11.75V4.25Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,    
    name: 'Dashboard',
    path: '/dashboard'
}, {
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.9075 11.9175C15.4304 13.0459 14.6841 14.0402 13.7339 14.8135C12.7837 15.5868 11.6586 16.1156 10.4568 16.3536C9.25508 16.5916 8.01331 16.5316 6.84011 16.1789C5.6669 15.8261 4.59797 15.1913 3.72676 14.33C2.85556 13.4687 2.20861 12.4071 1.84247 11.238C1.47634 10.0689 1.40217 8.82787 1.62645 7.62348C1.85072 6.41909 2.36662 5.28797 3.12903 4.32903C3.89144 3.37008 4.87716 2.61249 6 2.1225" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98491 1.5 9 1.5V9H16.5Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,    
    name: 'Dota Stats Overlay',
    path: '/dotaOverlay'
}];


export default function Navigation(): ReactElement {
    const router = useRouter();

    return <nav className={'navigation'}>

        {items.map((item) => <Link key={item.path} href={item.path}>
            <div className={classNames('link', {active: item.path === (router && router.pathname)})}>
                {item.icon}
                <div className={'linkLabel'}>{item.name}</div>
            </div>
        </Link>
        )}

        <style jsx>{`
            .navigation {
                margin-top: 30px;
            }

            .link {
                padding: 12px 24px;
                font-size: 14px;
                line-height: 14px;
                stroke: #6C757D;
                color: #3B4044;
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: background-color 120ms ease-in-out, color 120ms ease-in-out, stroke 120ms ease-in-out;
            }

            .link:hover {
                background-color: rgba(0,0,0,.1);
            }

            .link.active {
                background-color: #2B333B;
                color: #FFF;
                stroke: #FFF;
            }

            .linkLabel {
                margin-left: 16px;
            }
        `}</style>
    </nav>;
}