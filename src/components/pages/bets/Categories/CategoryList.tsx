import { ReactElement, useState } from "react";
import { useAbortFetch } from "../../../../hooks/abortFetch";
import { fetchUserBetSeasons, deleteSeason, patchBetSeason } from "../../../../api/betSeason";
import { BetSeason } from "../../../../api/@types/BetSeason";
import Loader from "../../../Loader";
import { List, Typography, Popconfirm, Modal } from "antd";
import { BranchesOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import CategoryForm from "../Forms/CategoryForm";

const nameMap = {
    ladder: 'Ladder',
    tournament: 'Turnier',
}

export default function CategoryList(): ReactElement {
    const [seasons, load] = useAbortFetch<BetSeason[]>(fetchUserBetSeasons);
    const [category, setCategory] = useState<Partial<BetSeason>>();
    const [open, setOpen] = useState(false);

    if(seasons) {
        return <>
            <List style={{marginTop: '20px', minWidth: '400px'}}>
                {seasons.map((season) => <List.Item key={season.id}>
                    <div className={'item'}>
                        <div className={'header'}>
                            <Typography.Text>{season.name}</Typography.Text>
                            <div className={'type'}>
                                <div className={'typeName'}>{nameMap[season.type]}</div>
                                <BranchesOutlined />
                            </div>
                        </div>

                        <div className={'description'}>{season.description}</div>

                        <div className={'footer'}>
                            <div className={'link'} onClick={() => {
                                setCategory(season);
                                setOpen(true);
                            }}>
                                <EditFilled />
                                <div className={'label'}>Bearbeiten</div>
                            </div>
                            <Popconfirm title="Soll diese Season gelöscht werden?" onConfirm={async () => {
                                await deleteSeason(season.id);
                                await load();
                            }} okText="Ja" cancelText="Nein">
                                <div className={'link'}>
                                    <DeleteFilled />
                                    <div className={'label'}>Löschen</div>
                                </div>
                            </Popconfirm>
                        </div>
                    </div>
                </List.Item>)}
            </List>

            <Modal title="Kategorie bearbeiten" visible={open} onCancel={() => setOpen(false)} onOk={async () => {
                await patchBetSeason(category.id, category);
                setOpen(false);
                load();
            }}>
                <CategoryForm data={category} submitLabel={'Speichern'} onValuesChange={setCategory}/>
            </Modal>

            <style jsx>{`
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }

                .type {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }

                .typeName {
                    margin-right: 8px;
                }

                .description {
                    color: #8C8C8C;
                    font-size: 12px;
                    line-height: 20px;
                    margin-bottom: 10px;
                }

                .footer {
                    display: grid;
                    grid-template-columns: max-content max-content;
                    align-items: center;
                    grid-column-gap: 35px;
                }

                .label {
                    margin-left: 8px;
                }

                .link {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }

                .item {
                    padding: 15px 0;
                    border-bottom: 1px solid #E8E8E8;
                    width: 100%;
                }
            `}</style>
        </>;
    }

    return <Loader />

}