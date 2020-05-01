import { ReactElement } from "react";
import { patchUser } from "../../../../api/user";
import { Select, Typography } from "antd";
import Loader from "../../../Loader";
import { CategoryProps } from "./Category";

export default function CurrentCategory({seasons, currentBetSeason, onChange}: CategoryProps & {onChange: () => void}): ReactElement {
    if(currentBetSeason && seasons) {
        return <>
            <Typography.Text strong>Aktuelle Kategorie</Typography.Text><br />
            <Select defaultValue={currentBetSeason} style={{width: '200px'}} onChange={async (betSeasonId) => {
                await patchUser({betSeasonId});
                onChange();
            }}>
                {seasons.map(({id, name}) => <Select.Option key={id} value={id}>{name}</Select.Option>)}
            </Select>
        </>;
    }

    return <Loader />;
}