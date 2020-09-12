import classNames from "classnames";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import HeroAvatar from "../../HeroAvatar";
import HeroStats from "./HeroStats";

const variants = {
    hidden: {scale: 0, opacity: 0},
    visible: {scale: 1, opacity: 1},
}

interface Props {
    name: string;
    id?: number;
    type: 'pick' | 'ban';
    idx: number; 
}

export default function DraftEntry({id, idx, name, type}: Props): ReactElement {
    if(id) {
        return <motion.div initial={'hidden'} animate={'visible'} variants={variants}>
            <div className={classNames('entry', type)}>
                <div className={'avatar'}>
                    <HeroAvatar heroClass={name} prefix={'h'} />
                </div>

                <HeroStats id={id} />
            </div>

            <style jsx>{`
                .entry {
                    height: 50px;
                    padding: 5px 10px;
                    display: flex;
                    align-items: center;
                }    

                .avatar {
                    height: 40px;
                    width: auto;
                    object-fit: cover;
                    flex-shrink: 0;
                    margin-right: 20px;
                    width: 100px;
                }

                .ban {
                    background-color: rgba(214, 52, 42, 0.1);
                }

                .pick {
                    background-color: rgba(93, 185, 60, 0.1);
                }

                .ban .avatar {
                    filter: grayscale(0.5);
                    opacity: 0.5;
                }
            `}</style>
        </motion.div>;
    }

    return <div className={classNames('placeholder', type)}>
        {type} - {idx}
        <style jsx>{`
            .placeholder {
                border-radius: 4px;
                border: 1px dashed #DDD;
                height: 50px;
                color: #BBB;
                display: flex;
                align-items: center;
                justify-content: center;
                text-transform: uppercase;
            }    

            .ban {
                background-color: rgba(214, 52, 42, 0.1);
            }

            .pick {
                background-color: rgba(93, 185, 60, 0.1);
            }
        `}</style>
    </div>;
}