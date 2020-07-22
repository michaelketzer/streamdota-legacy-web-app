import { ReactElement } from "react";
import { motion } from 'framer-motion'; 

const variants = {
    hidden: {scale: 0},
    show: {scale: 1, transition: {delay: 3.5}},
}

export default function BettingSlider(): ReactElement {
    return <div className={'sliderContainer'}>
        <motion.div className={'slider'} initial={'hidden'} animate={'show'} variants={variants} />

        <style jsx global>{`
            .sliderContainer {
                position: absolute;
                top: 3.5rem;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .slider {
                height: 3rem;
                width: 30rem;
                border-radius: 1.5rem;
                background-color: #FFF;
            }
        `}</style>
    </div>;
} 