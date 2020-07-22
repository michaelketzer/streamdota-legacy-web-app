import { ReactElement } from "react";
import { motion } from 'framer-motion'; 

const variants = {
    hidden: {scale: 0},
    show: {scale: 1, transition: {delay: 3.5}},
}

const bubble = {
    hidden: {scale: 0},
    show: {
        scale: 1, 
        transition: {
            delay: 3.8
        }
    },
}

export default function BettingSlider(): ReactElement {
    return <div className={'sliderContainer'}>
        <motion.div className={'slider'} initial={'hidden'} animate={'show'} variants={variants}>
            <motion.div className={'sliderbubble'} variants={bubble} initial={'hidden'} animate={'show'} />
        </motion.div>


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
                position: relative;
            }

            .sliderbubble {
                background: linear-gradient(to bottom, rgba(100,100,100,1) 0%,rgba(14,14,14,1) 100%);
                height: 3.4rem;
                width: 3.4rem;
                border-radius: 1.7rem;
                border: 2px solid #CCC;
                margin-top: -0.2rem;
                box-shadow: 1px 1px 20px 0 rgba(0,0,0,0.4);
                position: absolute;
                left: 13.3rem;
            }
        `}</style>
    </div>;
} 