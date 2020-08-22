import { ReactElement, useMemo } from 'react';
import { ExclamationCircleOutlined, DownloadOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useStateValue } from '../../context/websocket/context';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGsi } from '../../../modules/reducer/DotaOverlay';
import { getDefaultHeader } from '../../../modules/middleware/Network';
import fetch from 'isomorphic-unfetch';
import i18nInstance from '../../../i18n';
import { WithTranslation } from 'next-i18next';

async function downloadGsiConfig(): Promise<void> {
    const response = await fetch(process.env.API_URL + '/dota-gsi/generateConfig', {headers: getDefaultHeader()});
    const filename = response.headers.get('Content-Disposition').split('filename=')[1];
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();    
    a.remove();
}

interface Props extends WithTranslation {
	gsiAuth: string;
	gsiConnected: boolean;
}

const SetupGsi = ({ t, gsiAuth, gsiConnected }: Props): ReactElement => {
	const [ { messages } ] = useStateValue();
	const dispatch = useDispatch();
	const onLoadGsi = async () => await downloadGsiConfig();
	const onResetGsi = async () => await dispatch(resetGsi());
	const hasSetup = useMemo(() => gsiAuth && gsiAuth.length > 0, [ gsiAuth ]);

	if (hasSetup) {
		return (
			<div className={'gsiSetup'}>
				{!gsiConnected &&
				messages.length === 0 && (
					<React.Fragment>
						<div className={'status'}>
							<WarningOutlined style={{ fontSize: '22px' }} />
							<div className={'label'}>{t('gsi-setup-noConnection-header')}</div>
						</div>
						<p>{t('gsi-setup-noConnection-desc')}</p>
						<p>{t('gsi-setup-noConnection-desc-2')}</p>
						<div className={'listEntry'}>
							<div className={'createLabel'}>
								<b>1.</b> {t('gsi-setup-noConnection-step1')}
							</div>
							<Button type={'primary'} onClick={onLoadGsi} icon={<DownloadOutlined />}>
							{t('gsi-setup-noConnection-step1-button')}
							</Button>
						</div>
						<div className={'listEntry'}>
							<div>
								<b>2.</b> {t('gsi-setup-noConnection-step2')}{' '}
								<i>steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\</i>
							</div>
						</div>
						<div className={'listEntry'}>
							<div>
								<b>3.</b> {t('gsi-setup-noConnection-step3')}
							</div>
						</div>
					</React.Fragment>
				)}

				{(gsiConnected || messages.length > 0) && (
					<React.Fragment>
						<div className={'status success'}>
							<CheckCircleOutlined style={{ fontSize: '22px' }} />
							<div className={'label'}>{t('gsi-setup-success-header')}</div>
						</div>

						<div className={'successInfo'}>
						{t('gsi-setup-success-desc')}
						</div>

						<Popconfirm
							title={t('gsi-reset')}
							onConfirm={onResetGsi}
							okText={t('gsi-reset-confirm')}
							cancelText={t('gsi-reset-cancel')}>
							<Button type={'dashed'}>{t('gsi-setup-success-button')}</Button>
						</Popconfirm>
					</React.Fragment>
				)}

				<style jsx>{`
					.status {
						display: flex;
						align-items: center;
						color: #ffa940;
						font-size: 16px;
						font-weight: 500;
						margin-bottom: 25px;
					}

					.successInfo {
						margin-bottom: 70px;
					}

					.success {
						color: #389e0d;
					}

					.label {
						margin-left: 15px;
					}

					.createLabel {
						margin-right: 15px;
					}

					.gsiSetup {
						padding: 20px;
					}

					.listEntry {
						display: flex;
						align-items: center;
						margin-top: 5px;
					}

					.download {
						border: 1px solid #ccc;
						border-radius: 4px;
						cursor: pointer;
						padding: 5px 10px;
						margin: 0 15px;
						transition: background-color 120ms ease-in-out;
						font-size: 12px;
						text-transform: uppercase;
					}

					.download:hover {
						background-color: rgba(0, 0, 0, .05);
					}
				`}</style>
			</div>
		);
	}
	return (
		<div className={'gsiSetup'}>
			<div className={'status'}>
				<ExclamationCircleOutlined style={{ fontSize: '22px' }} />
				<div className={'label'}>{t('gsi-not-setup-header')}</div>
			</div>

			<h4>{t('gsi-setup-header')}</h4>
			<div className={'listEntry'}>
				<div className={'createLabel'}>
					<b>1.</b> {t('gsi-setup-step1')}
				</div>
				<Button type={'primary'} onClick={onLoadGsi} icon={<DownloadOutlined />}>
				{t('gsi-setup-step1-button')}
				</Button>
			</div>
			<div className={'listEntry'}>
				<div>
					<b>2.</b> {t('gsi-setup-step2')}{' '}
					<i>steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\</i>
				</div>
			</div>
			<div className={'listEntry'}>
				<div>
					<b>3.</b> {t('gsi-setup-step3')}
				</div>
			</div>

			<style jsx>{`
				.status {
					display: flex;
					align-items: center;
					color: #cf1322;
					font-size: 16px;
					font-weight: 500;
					margin-bottom: 25px;
				}

				.label {
					margin-left: 15px;
				}

				.createLabel {
					margin-right: 15px;
				}

				.gsiSetup {
					padding: 20px;
				}

				.listEntry {
					display: flex;
					align-items: center;
					margin-top: 5px;
				}

				.download {
					border: 1px solid #ccc;
					border-radius: 4px;
					cursor: pointer;
					padding: 5px 10px;
					margin: 0 15px;
					transition: background-color 120ms ease-in-out;
					font-size: 12px;
					text-transform: uppercase;
				}

				.download:hover {
					background-color: rgba(0, 0, 0, .05);
				}
			`}</style>
		</div>
	);
}

export default i18nInstance.withTranslation('dashboard')(SetupGsi);