import { ReactElement, useState, useEffect } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { User } from "../../../../api/@types/User";
import { fetchCurrentUser } from "../../../../api/user";
import Loader from "../../../Loader";
import CategorySelect from "./CategorySelect";
import RoundsTable from "./RoundsTable";


export default function Tab(): ReactElement {
    const [user] = useAbortFetch<User>(fetchCurrentUser);
    const [season, setSeason] = useState(null);

    useEffect(() => {
        user && setSeason(user.betSeasonId);
    }, [user]);

    if(user) {
        return <>
            <CategorySelect season={season} setSeason={setSeason} />
            <br />
            <br />
            {season && <RoundsTable season={season} />}
        </>;
    }

    return <Loader />;
}