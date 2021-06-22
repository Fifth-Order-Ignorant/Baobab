import { Spin } from 'antd';
import { PostProps } from './Post';
import { PostList } from "./PostList";
import { useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";

/**
 * Interface for PostFeed.
 */
export interface PostFeedProps {
    /**
     *  Function that returns posts.
     */
    onLoad: () => Promise<PostProps[]>;
    /**
     * Function that sends posts.
     */
     sendPost: (content: string, postId: number) => Promise<void>;
}

/**
 * Renders the infinite scrolling post feed.
 */
export default function PostFeed(props: PostFeedProps): JSX.Element {

    const [loading, setLoading] = useState(false);
    const [postList, setPostList] = useState<PostProps[]>([]);

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
        const postPropsList: PostProps[] = await props.onLoad();
        const newPostList: PostProps[] = postList.concat(postPropsList);
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
            <PostList postPropsList={postList} sendPost={props.sendPost} />
            <div className={styles.postLoading}>
                {loading && <Spin size={'large'} />}
            </div>
        </div>
    );
}