import { Spin } from 'antd';
import { PostList, PostListPropsWithId } from "./PostList";
import { useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";

/**
 * Interface for PostFeed.
 */
export interface PostFeedProps {
    /**
     *  Function that returns posts.
     */
    onLoad: () => Promise<PostListPropsWithId[]>;
    /**
     *  Initial set of posts.
     */
    initMessages: PostListPropsWithId[];
}

/**
 * Renders the infinite scrolling post feed.
 */
export default function PostFeed(props: PostFeedProps): JSX.Element {

    const [loading, setLoading] = useState(false);
    const [messageList, setMessageList] = useState<PostListPropsWithId[]>([]);

    useEffect(() => {
        getMessage().then(() => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        })
    }, []);

    /**
     * Gets the current post feed using the passed in onLoad function.
     */
    const getMessage = async () => {
        setLoading(true);
        const messagePropsList: PostListPropsWithId[] = await props.onLoad();
        const newMessageList: PostListPropsWithId[] = messageList.concat(messagePropsList);
        setMessageList(newMessageList);
        setLoading(false);
    }

    /**
     * Checks if the user has reached the end of the page, and fetches posts
     * if it does (simulates infinite scrolling).
     * @param e Scrolling event.
     */
    const handleScroll = async (e: Event) => {
        if (document.documentElement.scrollTop + window.innerHeight !== document.documentElement.scrollHeight) return;
        await getMessage();
    }

    return (
        <div>
            <PostList messagePropsList={messageList} />
            <div className={styles.messageLoading}>
                {loading && <Spin size={'large'} />}
            </div>
        </div>
    );
}