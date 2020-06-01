import { ReactElement, useState, useCallback } from 'react';
import { Checkbox, Input, Popconfirm, Button } from 'antd';
import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { DeleteOutlined } from '@ant-design/icons';
import Loader from '../../Loader';
import { useUserTimer } from '../../../modules/selector/Timer';
import { useDispatch } from 'react-redux';
import { createTimer, updateTimer, deleteTimer } from '../../../modules/reducer/Timer';

export default function Commands(): ReactElement {
	const timers = useUserTimer();
	const dispatch = useDispatch();
	const [ period, setPeriod ] = useState(5);
	const [ msg, setMsg ] = useState('');
	const [ act, setAct ] = useState(false);

	const create = useCallback(
		async () => {
			if (msg.length > 0) {
				await dispatch(createTimer({ active: act, period: period * 60, message: msg }));
				setPeriod(5);
				setMsg('');
			}
		},
		[ act, period, msg ]
	);

	if (timers) {
		return (
			<div className={'commandsGrid'}>
				<div className={'label'}>Aktiv</div>
				<div className={'label'}>
					Interval <span className={'small'}>(Minuten)</span>
				</div>
				<div className={'label'}>Nachricht</div>
				<div className={'label'} />

				{timers.map(({ active, id, period, message }) => (
					<React.Fragment key={id}>
						<div className={'activeBox'}>
							<Checkbox
								defaultChecked={active}
								onChange={async (e) => await dispatch(updateTimer(id, { active: e.target.checked }))}
							/>
						</div>
						<div>
							<Input
								defaultValue={period / 60}
								onBlur={async (e) => await dispatch(updateTimer(id, { period: +e.target.value * 60 }))}
							/>
						</div>
						<TextArea
							defaultValue={message}
							onBlur={async (e) => await dispatch(updateTimer(id, { message: e.target.value }))}
						/>
						<div>
							<Popconfirm
								title='Soll dieser Timer wirklich gelöscht werden?'
								onConfirm={async () => await dispatch(deleteTimer(id))}
								okText='Ja'
								cancelText='Nein'>
								<Button danger icon={<DeleteOutlined />} type={'primary'} />
							</Popconfirm>
						</div>
					</React.Fragment>
				))}

				<div className={'activeBox'}>
					<Checkbox defaultChecked={act} onChange={(e) => setAct(e.target.checked)} />
				</div>
				<div>
					<Input value={period} onChange={(e) => setPeriod(+e.target.value)} placeholder={'Period'} />
				</div>
				<TextArea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={'Antwort'} />
				<div />
				<div />
				<div />
				<div className={'createButton'}>
					<Button type={'primary'} onClick={create}>
						Erstellen
					</Button>
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
			</div>
		);
	}

	return <Loader />;
}
