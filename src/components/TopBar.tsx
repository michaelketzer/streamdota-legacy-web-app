import { ReactElement } from "react";
import { fetchCurrentUser } from "../api/user";
import { User } from "../api/@types/User";
import { useAbortFetch } from "../hooks/abortFetch";
import Picture from "./Picture";

export default function TopBar(): ReactElement {
    const [user] = useAbortFetch<User>(fetchCurrentUser);

    return <div className={'header'}>
        <img alt={'site_logo'} title={'Site Logo'} src={'/images/header_logo.png'} />

        <div className={'userData'}>
            <div className={'username'}>{user && user.displayName}</div>
            <div className={'userAvatar'}>
                <Picture entitiy={user} accessor={'userAvatar'} alt={'user_avatar'} />
            </div>
        </div>
        <style jsx>{`
            .header {
                padding: 10px 40px 10px 80px;
                display: flex;
                justify-content: space-between;
            }

            .userData {
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            .username {
                color: #FFF;
            }

            .userAvatar {
                background-color: rgba(0,0,0,.5);
                height: 30px;
                width: 30px;
                border-radius: 15px;
                margin-left: 20px;
                transition: border-radius 240ms ease-in-out;
                overflow: hidden;
                padding: 5px;
            }

            .userData:hover .userAvatar {
                border-radius: 10px;
            }
        `}</style>
    </div>;
}