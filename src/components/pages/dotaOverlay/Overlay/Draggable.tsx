import { ReactElement, ReactNode } from "react";
import ReactDraggable from 'react-draggable';
import { getVariant } from "./FontVariantSelection";
import { DotaOverlay } from "../../../../api/@types/DotaOverlay";

interface Props {
    cfg: DotaOverlay;
    color: string;
    children: ReactNode;
    x: number;
    y: number;
    patch: (x, y) => void;
    height: string;
}

export default function Draggable({cfg, color, children, x, y, patch, height}: Props): ReactElement {
    return <ReactDraggable bounds={'parent'} scale={2} position={{x, y}} onStop={(_e, data) => patch(data.x, data.y)}>
        <div style={{
            border: '1px dashed #666',
            color, 
            display: 'inline', 
            position: 'absolute', 
            top: 0,
            left: 0,
            cursor: 'move',
            fontSize: cfg.fontSize + 'px',
            lineHeight: height,
            fontFamily: cfg.font,
            ...getVariant(cfg.variant),
        }}>{children}</div>
    </ReactDraggable>;
}