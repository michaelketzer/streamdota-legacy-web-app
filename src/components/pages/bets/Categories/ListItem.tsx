import { ReactElement } from "react";
import { List, Typography, Popconfirm } from "antd";
import { BranchesOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import classNames from "classnames";
import { BetSeason } from "@streamdota/shared-types";

const nameMap = {
    ladder: 'Ladder',
    tournament: 'Turnier',
}

interface Props {
    activeSeason: number;
    season: BetSeason;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ListItem({activeSeason, season, onEdit, onDelete}: Props): ReactElement {
    return <List.Item key={season.id}>
    <div className={'item'}>
        <div className={'header'}>
            <Typography.Text><span className={classNames({active: activeSeason === season.id})}>{season.name}</span></Typography.Text>
            <div className={'type'}>
                <div className={'typeName'}>{nameMap[season.type]}</div>
                <BranchesOutlined />
            </div>
        </div>

        <div className={'description'}><Typography.Text type="secondary">{season.description}</Typography.Text></div>

        <div className={'footer'}>
            <div className={'link'} onClick={onEdit}>
                <EditFilled />
                <div className={'label'}>Bearbeiten</div>
            </div>
            <Popconfirm title="Soll diese Season gelöscht werden?" onConfirm={onDelete} okText="Ja" cancelText="Nein">
                <div className={'link'}>
                    <DeleteFilled />
                    <div className={'label'}>Löschen</div>
                </div>
            </Popconfirm>
        </div>
    </div>

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
            width: 100%;
        }

        .active {
            color: #096DD9;
        }
    `}</style>
</List.Item>
}