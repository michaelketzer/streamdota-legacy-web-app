import { User } from "@streamdota/shared-types";
import { Input } from "antd";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "../../../hooks/currentUser";
import { updateCurrentUser } from "../../../modules/reducer/Ui";


export default function TeamNames(): ReactElement {
    const user = useCurrentUser();
    const dispatch = useDispatch();

    const patchTeamName = useCallback(async (data: Partial<User>) => {
        dispatch(updateCurrentUser(data));
    }, [dispatch]);

    return <div className={'teamGrid'}>
        <div>
            <div>
                Team A
            </div>

            <Input defaultValue={user.teamAName} onBlur={async (e) => patchTeamName({teamAName: e.target.value})} />
        </div>
        <div>
            <div>
                Team B
            </div>

            <Input defaultValue={user.teamBName} onBlur={async (e) => patchTeamName({teamBName: e.target.value})} />
        </div>

        <style jsx>{`
            .teamGrid {
                display: grid;
                grid-template-columns: 150px 150px;
                grid-column-gap: 30px;
            }    
        `}</style>
    </div>;
}