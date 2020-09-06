import { ReactElement, useState } from "react";
import CategorySelect, { useSelectedCategory } from "../CategorySelect";
import Loader from "../../../Loader";
import ToplistTable from "./ ToplistTable";
import { Input, Popover, Button } from "antd";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";
import DrawWinner from "./DrawWinner";

const Tab = ({t}: WithTranslation): ReactElement => {
    const {category, setCategory} = useSelectedCategory();
    const [search, setSearch] = useState('');
    const [drawWinner, setDrawWinner] = useState(false);

    if(category) {
        return <>
            <div className={'filter'}>
                <div className={'row'}>
                    <div className={'search'}>
                        <CategorySelect season={category} setSeason={setCategory} />
                    </div>
                    <Input.Search onChange={(e) => setSearch(e.target.value)}  placeholder={t('bet-season-toplist-search')} style={{width: '200px'}} />
                </div>
                <div className={'randomWinner'}>
                    <Button onClick={() => setDrawWinner(true)}>{t('bet-toplist-random-winner')}</Button>
                    <DrawWinner show={drawWinner} setShow={setDrawWinner} season={category} />
                </div>
            </div>
            <br />
            <br />
            <ToplistTable season={category} search={search} />

            <style jsx>{`
                .filter, .row {
                    display: flex;
                    align-items: flex-end;
                }  

                .filter {
                    justify-content: space-between;
                }

                .search {
                    margin-right: 20px;
                }  
            `}</style>
        </>;
    }

    return <Loader />;
}

export default i18nInstance.withTranslation('betSystem')(Tab);