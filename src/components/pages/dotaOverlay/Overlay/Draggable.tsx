import { ReactElement, ReactNode } from "react";
import ReactDraggable from 'react-draggable';
import { OverlayConfig } from "../OverlaySetup";
import { getVariant } from "./FontVariantSelection";

interface Props {
    cfg: OverlayConfig;
    color: string;
    children: ReactNode;
    x: number;
    y: number;
    patch: (x, y) => void;
}

export default function Draggable({cfg, color, children, x, y, patch}: Props): ReactElement {
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
            lineHeight: cfg.fontSize + 'px',
            fontFamily: cfg.font,
            ...getVariant(cfg.variant),
        }}>{children}</div>
    </ReactDraggable>;
}