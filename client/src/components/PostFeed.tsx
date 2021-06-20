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
    initPosts: PostListPropsWithId[];
}

/**
 * Renders the infinite scrolling post feed.
 */
export default function PostFeed(props: PostFeedProps): JSX.Element {

    const [loading, setLoading] = useState(false);
    const [postList, setPostList] = useState<PostListPropsWithId[]>([]);

    useEffect(() => {
        getPost().then(() => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        })
    }, []);

    /**
     * Gets the current post feed using the passed in onLoad function.
     */
    const getPost = async () => {
        setLoading(true);
        const postPropsList: PostListPropsWithId[] = await props.onLoad();
        const newPostList: PostListPropsWithId[] = postList.concat(postPropsList);
        setPostList(newPostList);
        setLoading(false);
    }

    /**
     * Checks if the user has reached the end of the page, and fetches posts
     * if it does (simulates infinite scrolling).
     * @param e Scrolling event.
     */
    const handleScroll = async (e: Event) => {
        if (document.documentElement.scrollTop + window.innerHeight !== document.documentElement.scrollHeight) return;
        await getPost();
    }

    return (
        <div>
            <PostList postPropsList={postList} />
            <div className={styles.messageLoading}>
                {loading && <Spin size={'large'} />}
            </div>
        </div>
    );
}