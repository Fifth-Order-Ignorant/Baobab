import { Spin } from 'antd';
import { MessageList, MessagePropsWithID } from "./MessageList";
import { useEffect, useState } from "react";
import styles from "../../styles/Message.module.css";

/**
 * Interface for MessageFeed.
 */
export interface MessageFeedProps{
    onLoad: () => Promise<MessagePropsWithID[]>;
    initMessages: MessagePropsWithID[];
}

/**
 * Renders the infinite scrolling message feed.
 * @param MessageFeedProps Props that contain the following:
 *      - onLoad: async function that is called while loading
 */
export default function MessageFeed(props: MessageFeedProps): JSX.Element {

    const [loading, setLoading] = useState(false);
    const [messageList, setMessageList] = useState<MessagePropsWithID[]>([]);

    useEffect(async () => {
        window.addEventListener('scroll', handleScroll);
        await getMessage();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getMessage = async () => {
        setLoading(true);
        const messagePropsList: MessagePropsWithID[] = await props.onLoad();
        const newMessageList = messageList.concat(messagePropsList);
        setMessageList(newMessageList);
        console.log(newMessageList);
        setLoading(false);
    }

    const handleScroll = async (e: Event) => {
        if (document.documentElement.scrollTop + window.innerHeight !== document.documentElement.scrollHeight) return;
        await getMessage();
    }

    return (
        <div>
            <MessageList messagePropsList={messageList} />
            <div className={styles.messageLoading}>
            {loading && <Spin size={'large'} />}
            </div>
        </div>
    );
}