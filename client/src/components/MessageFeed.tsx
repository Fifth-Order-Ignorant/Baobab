import { Spin } from 'antd';
import { MessageList } from "./MessageList";
import sampleMessages from "../constants/SampleMessageList";
import { useState } from "react";
import styles from "../../styles/Message.module.css";

/**
 * Renders the infinite scrolling message feed.
 */
export default function MessageFeed(): JSX.Element {

    const [loading, setLoading] = useState(false);

    return (
        <div>
            <MessageList messagePropsList={sampleMessages} />
            <div className={styles.messageLoading}>
            {loading && <Spin size={'large'} />}
            </div>
        </div>
    );
}