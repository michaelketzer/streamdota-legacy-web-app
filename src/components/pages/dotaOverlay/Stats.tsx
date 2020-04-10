import { ReactElement, useCallback } from "react";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchCurrentUser, patchUser } from "../../../api/user";
import Loader from "../../Loader";
import { Radio } from "antd";
import { User } from "../../../api/@types/User";
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

export default function Stats(): ReactElement {
    const [user, load] = useAbortFetch<User>(fetchCurrentUser);

    const patch = useCallback(
        async (dotaStatsFrom: User['dotaStatsFrom']) => {
            await patchUser({dotaStatsFrom});
            await load();
        },
        [load],
    );

    if(user) {
        return <>
            <h1>Stats setup</h1>
            
            <div>Bestimme ab wann die Stats angezeigt werden:</div>

            <Radio.Group onChange={(e) =>  patch(e.target.value)} value={user.dotaStatsFrom}>
                <Radio style={radioStyle} value={'session'}>
                    Session - Die Stats werden ab dem aktiven Stream angezeigt
                </Radio>
                <Radio style={radioStyle} value={'day'}>
                    Tag - Die Stats werden ab dem heutigen Tag angezeigt
                </Radio>
            </Radio.Group>
        </>;
    }

    return <Loader />;
}