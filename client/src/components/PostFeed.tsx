import { PostList } from './PostList';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { PostResponse } from 'baobab-common';

type PostFeedProps = {
  /**
   * Function used to fetch posts in batches.
   * @param page Batch number.
   */
  fetchPosts: (page: number) => Promise<PostResponse[]>;
};

/**
 * Renders the infinite scrolling post feed.
 */
export default function PostFeed(props: PostFeedProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState<PostResponse[]>([]);

  const [hasMore, setHasMore] = useState(true);

  const loadMore = async (page: number) => {
    setLoading(true);

    const newPosts = await props.fetchPosts(page);

    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      setPostList(postList.concat(newPosts));
    }

    setLoading(false);
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={!loading && hasMore}
    >
      <PostList depth={0} postPropsList={postList} isLoading={loading} />
    </InfiniteScroll>
  );
}
