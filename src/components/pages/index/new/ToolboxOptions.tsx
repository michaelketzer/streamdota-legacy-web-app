import { ReactElement, useState, useEffect, useMemo } from "react";
import Typist from 'react-typist';
import i18n, { TransFN } from "../../../../i18n";


const words = [
    'streaming',
    'casting',
    'broadcasting',
    'spectating',
];

const ToolboxOptions = ({t}: {t: TransFN}): ReactElement => {
    const [key, setKey] = useState(0);

    const words = useMemo(() => {
        return [
            t('herobanner-header-streaming'),
            t('herobanner-header-casting'),
            t('herobanner-header-broadcasting'),
            t('herobanner-header-spectating'),
        ];
    }, [t, i18n.i18n.language]);

    useEffect(() => {
        setKey(key+1)
    }, [i18n.i18n.language]);

    return <span className={'options'}>
        <Typist key={key} onTypingDone={() => setKey(key+1)} cursor={{blink: true}}>
            {words.map((word) => ([
                <span>{word}</span>,
                <Typist.Backspace count={word.length} delay={1500} />,
            ]))}
        </Typist>

        <style jsx>{`
            .options {
                color: #fa7035; 
                margin: 0 1rem;
            }
        `}</style>

        <style jsx global>{`
            .Cursor {
                vertical-align: 3px;
            }
        `}</style>
    </span>
}

export default i18n.withTranslation('common')(ToolboxOptions);