import { ReactElement } from "react";
import {motion} from 'framer-motion';
import ToolboxOptions from "./ToolboxOptions";

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
};

const itemAnimations = {
    hidden: {opacity: 0, x: -50},
    show: {opacity: 1, x: 0},
}

export default function HeroBanner(): ReactElement {

    return <div className={'herobanner'}>
        <div className={'image'} />

        <div className={'content-wrapper'}>
            <div className={'text-wrapper'}>
                <motion.div initial={'hidden'} animate={'show'} variants={containerAnimation}>
                    <motion.div variants={itemAnimations}>
                        <div className={'main'}>Your toolbox for <ToolboxOptions /> Dota</div>
                    </motion.div>
                    <motion.div variants={itemAnimations}>
                        <div className={'sub'}>Enrich your stream with powerful <br /> <span className={'weak-highlight'}>overlays</span> and <span className={'weak-highlight'}>chat commands</span></div>
                    </motion.div>
                    <motion.div variants={itemAnimations}>
                        <a className={'learnMore'} href={'#wl'}>Learn more</a>
                    </motion.div>
                </motion.div>
            
            </div>

        </div>

        <style jsx>{`
            .herobanner {
                min-height: calc(100vh - 60px);
                width: 100%;
                position: relative;
            }

            .image {
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                background-image: url('/images/herobanner.jpg');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                height: 100%;
                width: 100%;
                opacity: .2;
                z-index: -1;
            }

            .content-wrapper {
                min-height: calc(100vh - 60px);
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }

            .text-wrapper {
                padding: 15px 20px;
                border-radius: 1rem;
                color: #666;
                font-weight: bold;
                text-transform: uppercase;
            }

            @media only screen and (min-width: 600px) {
                .text-wrapper {
                    padding: 2rem 8rem;
                }
            }

            .main {
                font-size: 45px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }

            .sub {
                font-size: 30px;
                margin-top: 2rem;
            }

            .weak-highlight {
                color: #FF9900;
            }

            .learnMore {
                background-color: #fa7035;
                padding: .7rem 2rem;
                margin-top: 4rem;
                border-radius: .7rem;
                display: inline-block;
                color: #FFF;
                user-select: none;
                cursor: pointer;
                transition: box-shadow 240ms ease-in-out;
            }
            .learnMore:hover {
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.2);
            }
        `}</style>
    </div>;
}