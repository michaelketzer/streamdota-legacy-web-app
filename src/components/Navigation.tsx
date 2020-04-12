import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from 'classnames';

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
}, {
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.75 0H2.25C1.00898 0 0 1.00898 0 2.25V12.375C0 13.616 1.00898 14.625 2.25 14.625H5.625V17.5781C5.625 17.8277 5.82891 18 6.04688 18C6.13125 18 6.21914 17.9754 6.29648 17.9156L10.6875 14.625H15.75C16.991 14.625 18 13.616 18 12.375V2.25C18 1.00898 16.991 0 15.75 0ZM16.875 12.375C16.875 12.9938 16.3688 13.5 15.75 13.5H10.3113L10.0125 13.725L6.75 16.1719V13.5H2.25C1.63125 13.5 1.125 12.9938 1.125 12.375V2.25C1.125 1.63125 1.63125 1.125 2.25 1.125H15.75C16.3688 1.125 16.875 1.63125 16.875 2.25V12.375ZM11.6648 8.34258C11.0039 9.11953 10.0336 9.5625 9 9.5625C7.96641 9.5625 6.99609 9.11953 6.33516 8.34609C6.13477 8.11055 5.77969 8.08594 5.54414 8.28281C5.30508 8.48672 5.28047 8.83828 5.48086 9.07734C6.35273 10.1004 7.63594 10.6875 9 10.6875C10.3641 10.6875 11.6473 10.1004 12.5227 9.07383C12.7266 8.83828 12.6949 8.4832 12.4594 8.2793C12.2238 8.07891 11.8687 8.10703 11.6648 8.34258V8.34258ZM6.75 6.46875C7.21758 6.46875 7.59375 6.09258 7.59375 5.625C7.59375 5.15742 7.21758 4.78125 6.75 4.78125C6.28242 4.78125 5.90625 5.15742 5.90625 5.625C5.90625 6.09258 6.28242 6.46875 6.75 6.46875ZM11.25 6.46875C11.7176 6.46875 12.0938 6.09258 12.0938 5.625C12.0938 5.15742 11.7176 4.78125 11.25 4.78125C10.7824 4.78125 10.4062 5.15742 10.4062 5.625C10.4062 6.09258 10.7824 6.46875 11.25 6.46875Z" fill="black"/>
    </svg>,
    name: 'StreamDota Bot',
    path: '/bot'
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