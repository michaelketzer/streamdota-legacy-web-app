import { ReactElement } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { fetchCurrentUser } from "../../../../api/user";
import { User } from "../../../../api/@types/User";
import Category from "./Category";

export default function Tab(): ReactElement | null {
    const [user, reloadUser] = useAbortFetch<User>(fetchCurrentUser);

    if(user) {
        return <Category user={user} reloadUser={reloadUser}/>;
    }

    return null;
}