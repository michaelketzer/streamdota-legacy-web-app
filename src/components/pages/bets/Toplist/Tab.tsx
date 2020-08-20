import { ReactElement, useState } from "react";
import CategorySelect, { useSelectedCategory } from "../CategorySelect";
import Loader from "../../../Loader";
import ToplistTable from "./ ToplistTable";
import { Input } from "antd";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

const Tab = ({t}: WithTranslation): ReactElement => {
    const {category, setCategory} = useSelectedCategory();
    const [search, setSearch] = useState('');

    if(category) {
        return <>
            <div className={'filter'}>
                <div className={'search'}>
                    <CategorySelect season={category} setSeason={setCategory} />
                </div>
                <Input.Search onChange={(e) => setSearch(e.target.value)}  placeholder={t('bet-season-toplist-search')} style={{width: '200px'}} />
            </div>
            <br />
            <br />
            <ToplistTable season={category} search={search} />

            <style jsx>{`
                .filter {
                    display: flex;
                    align-items: flex-end;
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