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
    const [messageList, setMessageList] = useState<MessagePropsWithID[]>(props.initMessages);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = async (e: Event) => {
        if (document.documentElement.scrollTop + window.innerHeight !== document.documentElement.scrollHeight) return;
        setLoading(true);
        const messagePropsList: MessagePropsWithID[] = await props.onLoad();
        setMessageList(messageList.concat(messagePropsList));
        setLoading(false);
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