import { ReactElement, useState } from "react";
import Loader from "../../../Loader";
import { List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CategoryPopup from "./CategoryPopup";
import { CategoryProps } from "./Category";
import ListItem from "./ListItem";
import { BetSeason } from "@streamdota/shared-types";
import { useDispatch } from "react-redux";
import { deleteBetSeason } from "../../../../modules/reducer/BetSeason";
import i18nInstance from "../../../../i18n";


export const emptySeason: () => Partial<BetSeason> = () => ({id: null, name: '', description: '', type: 'tournament'});

const CategoryList = ({t, seasons, currentBetSeason, canManage}: CategoryProps & {canManage: boolean}): ReactElement => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState<Partial<BetSeason> | null>(null);

    if(seasons) {
        return <>
            <List style={{marginTop: '20px', minWidth: '400px'}} pagination={{defaultCurrent: 1, position: 'bottom', pageSize: 3}} dataSource={seasons}
            renderItem={(season) => <ListItem key={season.id} activeSeason={currentBetSeason} season={season} onEdit={() => setCategory(season)} onDelete={async () => {
                await dispatch(deleteBetSeason(season.id));
            }} />} />

            <div className={'buttons'}>
                <Button type={'primary'} size={'middle'} icon={<PlusOutlined />} onClick={() => setCategory(emptySeason())}>{t('bet-season-new-season')}</Button>
                <Button type={'dashed'} size={'middle'} icon={<PlusOutlined />} disabled>{t('bet-season-accept-invite')}</Button>
            </div>
            <CategoryPopup season={category}/>

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

export default i18nInstance.withTranslation('betSystem')(CategoryList);