import { ReactElement } from "react";
import i18nInstance, { TransFN } from "../../../../i18n";
import { Button } from "antd";
import Link from "next/link";

const Header = ({t}: {t: TransFN}): ReactElement => {
    return <header>
        <div className={'inner'}>
            <div className={'logo'}>
                StreamDota 
                <span className={'minor'}>Beta</span>
                <Button size={'small'} onClick={() => i18nInstance.i18n.changeLanguage(i18nInstance.i18n.language === 'en' ? 'de' : 'en')}>
                    {i18nInstance.i18n.language === 'en' ? 'Deutsch' : 'Englisch'}
                </Button>    
            </div>

            <Link href={'/login'}>
                <a className={'login'}>
                    {t('twitchLogin')}
                </a>
            </Link>
        </div>

        <style jsx>{`
            header {
                height: 60px;
                box-shadow: 0 2px 20px 0 rgba(0,0,0,.1);
                width: 100vw;
                position: sticky;
                top: 0;
                left: 0;
                right: 0;
                z-index: 5;
                background-color: #FFF;
            }

            .inner {
                max-width: 1024px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 100%;
                padding: 0 30px;
            }

            .login {
                border-radius: 4px;
                background-color: rgb(145, 71, 255);
                cursor: pointer;
                height: 30px;;
                line-height: 30px;
                color: #FFF;
                font-size: 12px;
                font-weight: bold;
                padding: 0 10px;
            }

            .login:hover {
                background-color: rgb(119, 44, 232);
            }

            .logo {
                font-size: 20px;
            }

            .minor {
                font-size: 14px;
                color: #777;
                margin-right: 40px;
                margin-left: 8px;
            }
        `}</style>
    </header>;
}

export default i18nInstance.withTranslation('common')(Header);