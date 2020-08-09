import { ReactElement, useState } from "react";
import CategorySelect, { useSelectedCategory } from "../CategorySelect";
import Loader from "../../../Loader";
import ToplistTable from "./ ToplistTable";
import { Input } from "antd";

export default function Tab(): ReactElement {
    const {category, setCategory} = useSelectedCategory();
    const [search, setSearch] = useState('');

    if(category) {
        return <>
            <div className={'filter'}>
                <div className={'search'}>
                    <CategorySelect season={category} setSeason={setCategory} />
                </div>
                <Input.Search onChange={(e) => setSearch(e.target.value)}  placeholder={'Suche Benutzername...'} style={{width: '200px'}} />
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