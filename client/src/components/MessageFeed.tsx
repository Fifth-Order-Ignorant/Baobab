import { Spin } from 'antd';
import { MessageList, MessagePropsWithID } from "./MessageList";
import { useEffect, useState } from "react";
import styles from "../../styles/Message.module.css";

/**
 * Interface for MessageFeed.
 */
export interface MessageFeedProps {
    /**
     *  Function that returns messages.
     */
    onLoad: () => Promise<MessagePropsWithID[]>;
    /**
     *  Initial set of messages.
     */
    initMessages: MessagePropsWithID[];
}

/**
 * Renders the infinite scrolling message feed.
 */
export default function MessageFeed(props: MessageFeedProps): JSX.Element {

    const [loading, setLoading] = useState(false);
    const [messageList, setMessageList] = useState<MessagePropsWithID[]>([]);

    useEffect(() => {
        getMessage().then(() => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        })
    }, []);

    /**
     * Gets the current message feed using the passed in onLoad function.
     */
    const getMessage = async () => {
        setLoading(true);
        const messagePropsList: MessagePropsWithID[] = await props.onLoad();
        const newMessageList: MessagePropsWithID[] = messageList.concat(messagePropsList);
        setMessageList(newMessageList);
        setLoading(false);
    }

    /**
     * Checks if the user has reached the end of the page, and fetches messages
     * if it does (simulates infinite scrolling).
     * @param e Scrolling event.
     */
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