import { ReactElement, useState, useEffect } from "react";
import { Modal } from "antd";
import { patchBetSeason, createUserBetSeason } from "../../../../api/betSeason";
import { BetSeason } from "../../../../api/@types/BetSeason";
import CategoryForm from "./Form";
import { emptySeason } from "./CategoryList";

interface Props {
    season?: Partial<BetSeason>;
    onFinish?: () => void;
}

export default function CategoryPopup({onFinish, season}: Props): ReactElement | null {
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
                await patchBetSeason(season.id, data);
            } else {
                await createUserBetSeason(data);
            }
            setData(null);
            setOpen(false);
            onFinish();
        }}>
            <CategoryForm data={data} submitLabel={'Speichern'} onValuesChange={setData}/>
        </Modal>;
    }

    return null;
}