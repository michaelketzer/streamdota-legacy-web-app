import { ReactElement, useState, useEffect } from "react";
import { Modal } from "antd";
import CategoryForm from "./Form";
import { BetSeason } from "@streamdota/shared-types";
import { useDispatch } from "react-redux";
import { patchBetSeason, createBetSeason } from "../../../../modules/reducer/BetSeason";
import { WithTranslation } from "next-i18next";
import i18nInstance from "../../../../i18n";

interface Props extends WithTranslation {
    season?: Partial<BetSeason>;
}

const CategoryPopup = ({t, season}: Props): ReactElement | null => {
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
        return <Modal title={season.id ? t('bet-season-edit-season') : t('bet-season-create')} visible={open} onCancel={() => {
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
            <CategoryForm data={data} submitLabel={t('bet-season-save')} onValuesChange={setData}/>
        </Modal>;
    }

    return null;
}

export default i18nInstance.withTranslation('betSystem')(CategoryPopup);