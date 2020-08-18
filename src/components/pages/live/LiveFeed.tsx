import { ReactElement, useState, useEffect } from "react";
import { useMessageListener } from "../../context/websocket/MessageHandler";
import { isDraftMessage } from "../../context/websocket/state";
import { motion } from "framer-motion";
import EventRow from "./EventRow";


interface Props {
    apiKey: string;
    leagueId: number;
}

interface Event {
    team: 'radiant' | 'dire';
    type: 'pick' | 'ban';
    id: number;
    class: string;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
        staggerChildren: 0.2
        }
    }
}

  

const item = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 }
}

export default function LiveFeed({leagueId}: Props): ReactElement {
    const [events, setEvents] = useState<Event[]>([]);
    const message = useMessageListener();

    useEffect(() => {
        if(message && isDraftMessage(message)) {
            message.value.change.forEach(({id, class: heroClass}) => setEvents([{id, class: heroClass, team: message.value.team, type: message.value.type}, ...events]));
        }
    }, [message])

    return <motion.div initial={'hidden'} animate={'show'} variants={container}>
        {events.map(({id, class: heroClass, team, type}) => <motion.div key={id + ':' + team + ':' + type} variants={item}>
            <EventRow id={id} heroClass={heroClass} team={team} type={type} leagueId={leagueId} />
        </motion.div>)}
    </motion.div>;

}