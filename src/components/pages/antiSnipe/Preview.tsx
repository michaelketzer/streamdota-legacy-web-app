import { AntiSnipeOverlay } from "@streamdota/shared-types";
import { ReactElement } from "react";


export default function Preview({type, opacity}: AntiSnipeOverlay): ReactElement {
    return <div className={'preview'}>
        <img className={'exampleBackground'} src={'/images/preview_minimap.png'} />

        {type === 'normal' && <img className={'overlay'} src={'/images/minimap_full.png'} style={{opacity: opacity + '%'}} />}
        {type === 'rounded' && <img className={'overlay'} src={'/images/minimap_rounded.png'} style={{opacity: opacity + '%'}}/>}


        <style jsx>{`
            .preview {
                position: relative;
            }

            .overlay {
                position: absolute;
                bottom: 3px;
                left: 0;
            }

            .exampleBackground {
                width: 375px;
            }    
            
        `}</style>
    </div>;
}