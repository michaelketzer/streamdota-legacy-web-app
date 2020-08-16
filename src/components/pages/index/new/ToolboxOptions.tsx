import { ReactElement, useState, useEffect } from "react";
import Typist from 'react-typist';


const words = [
    'streaming',
    'casting',
    'broadcasting',
    'spectating',
];

export default function ToolboxOptions(): ReactElement {
    const [key, setKey] = useState(0);

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