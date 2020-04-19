import { ReactElement, useState, useCallback } from "react";
import CommandList from "./CommandList";
import { Typography, Tag, Checkbox, Input, Popconfirm, Button } from "antd";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { Timer } from "../../../api/@types/Timer";
import { getTimers, createTimer, updateTimer, deleteTimer } from "../../../api/timer";
import React from "react";
import TextArea from "antd/lib/input/TextArea";
import { DeleteOutlined } from "@ant-design/icons";
import Loader from "../../Loader";

export default function Commands(): ReactElement {
    const [timers, load] = useAbortFetch<Timer[]>(getTimers);
    const [period, setPeriod] = useState(5);
    const [msg, setMsg] = useState('');
    const [act, setAct] = useState(false);
    
    const create = useCallback(async () => {
        if(msg.length > 0) {
            await createTimer(act, period * 60, msg);
            await load();
            setPeriod(5);
            setMsg('');
        }
    }, [act, period, msg]);

    if(timers) {
        return <div className={'commandsGrid'}>
            <div className={'label'}>Aktiv</div>
            <div className={'label'}>Interval <span className={'small'}>(Minuten)</span></div>
            <div className={'label'}>Nachricht</div>
            <div className={'label'}></div>

            {timers.map(({active, id, period, message}) => <React.Fragment key={id}>
                <div className={'activeBox'}>
                    <Checkbox defaultChecked={active} onChange={async (e) => {
                        await updateTimer(id, e.target.checked, period, message);
                        await load();
                    }}/>
                </div>
                <div>
                    <Input defaultValue={period / 60} onBlur={async (e) => {
                        await updateTimer(id, active, +e.target.value * 60, message);
                        await load();
                    }} />
                </div>
                <TextArea defaultValue={message} onBlur={async (e) => {
                    await updateTimer(id, active, period, e.target.value);
                    await load();
                }} />
                <div>
    
                    <Popconfirm title="Soll dieser Timer wirklich gelöscht werden?" onConfirm={async () => {
                        await deleteTimer(id);
                        await load();
                    }} okText="Ja" cancelText="Nein">
                        <Button type={'danger'} icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            </React.Fragment>)}
    
            <div className={'activeBox'}>
                <Checkbox defaultChecked={act} onChange={(e) => setAct(e.target.checked)}/>
            </div>
            <div>
                <Input value={period} onChange={(e) => setPeriod(+e.target.value)} placeholder={'Period'} />
            </div>
            <TextArea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={'Antwort'} />
            <div></div>
            <div />
            <div />
            <div className={'createButton'}>
                <Button type={'primary'} onClick={create}>Erstellen</Button>
            </div>
    
            <style jsx>{`
                .activeBox {
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .label {
                    margin-bottom: -15px;
                    margin-top: 10px;
                }

                .commandsGrid {
                    display: grid;
                    grid-template-columns: max-content 170px 330px 1fr;
                    grid-column-gap: 20px;
                    grid-row-gap: 15px;
                }

                .createButton {
                    justify-self: flex-end;
                }
            `}</style>
        </div>;
    }

    return <Loader />;
}