import { ReactElement, useState, useEffect } from "react";
import { Modal } from "antd";
import CategoryForm from "./Form";
import { BetSeason } from "@streamdota/shared-types";
import { useDispatch } from "react-redux";
import { patchBetSeason, createBetSeason } from "../../../../modules/reducer/BetSeason";

interface Props {
    season?: Partial<BetSeason>;
}

export default function CategoryPopup({season}: Props): ReactElement | null {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<Partial<BetSeason>>();

    useEffect(() => {
        if(season) {
            setData(season);
            setOpen(true);
        }
    }, [season])

    if(data) {
        return <Modal title={season.id ? 'Kategorie bearbeiten' : 'Neue Kategorie'} visible={open} onCancel={() => {
            setData(null);
            setOpen(false);
        }} onOk={async () => {
            if(season.id) {
                await dispatch(patchBetSeason(season.id, data));
            } else {
                await dispatch(createBetSeason(data));
            }
            setData(null);
            setOpen(false);
        }}>
            <CategoryForm data={data} submitLabel={'Speichern'} onValuesChange={setData}/>
        </Modal>;
    }

    return null;
}