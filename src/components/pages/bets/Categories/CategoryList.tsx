import { ReactElement, useState } from "react";
import { deleteSeason } from "../../../../api/betSeason";
import { BetSeason } from "../../../../api/@types/BetSeason";
import Loader from "../../../Loader";
import { List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CategoryPopup from "./CategoryPopup";
import { CategoryProps } from "./Category";
import ListItem from "./ListItem";


export const emptySeason: () => Partial<BetSeason> = () => ({id: null, name: '', description: '', type: 'tournament'});

export default function CategoryList({seasons, reload, currentBetSeason, canManage}: CategoryProps & {canManage: boolean}): ReactElement {
    const [category, setCategory] = useState<Partial<BetSeason> | null>(null);

    if(seasons) {
        return <>
            <List style={{marginTop: '20px', minWidth: '400px'}} pagination={{defaultCurrent: 1, position: 'bottom', pageSize: 3}} dataSource={seasons}
            renderItem={(season) => <ListItem key={season.id} activeSeason={currentBetSeason} season={season} onEdit={() => setCategory(season)} onDelete={async () => {
                await deleteSeason(season.id);
                await reload();
            }} />} />

            <div className={'buttons'}>
                {canManage && <Button type={'primary'} size={'middle'} icon={<PlusOutlined />} onClick={() => setCategory(emptySeason())}>Neue Kategorie</Button>}
                <Button type={'dashed'} size={'middle'} icon={<PlusOutlined />} disabled>Einladung annehmen</Button>
            </div>
            <CategoryPopup season={category} onFinish={() => reload()}/>

            <style jsx>{`
                .buttons {
                    display: grid;
                    grid-template-columns: max-content max-content 1fr;
                    grid-column-gap: 25px;
                }    
            `}</style>
        </>;
    }

    return <Loader />

}