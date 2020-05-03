import { ReactElement } from "react";
import Loader from "../../../Loader";
import CategorySelect, { useSelectedCategory } from "../CategorySelect";
import RoundsTable from "./RoundsTable";


export default function Tab(): ReactElement {
    const {category, setCategory} = useSelectedCategory();

    if(category) {
        return <>
            <CategorySelect season={category} setSeason={setCategory} />
            <br />
            <br />
            <RoundsTable season={category} />
        </>;
    }

    return <Loader />;
}