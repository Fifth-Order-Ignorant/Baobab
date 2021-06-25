import { PostProps } from './Post';
import { PostList } from './PostList';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

/**
 * Renders the infinite scrolling post feed.
 */
export default function PostFeed(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState<PostProps[]>([]);

  const [hasMore, setHasMore] = useState(true);

  const loadMore = async (page: number) => {
    setLoading(true);

    const newPosts = await axios.get('/api/post/pagination', {
      params: {
        start: (page - 1) * 5,
        end: page * 5,
      },
    });

    if (newPosts.data.length === 0) {
      setHasMore(false);
    } else {
      setPostList(postList.concat(newPosts.data));
    }

    setLoading(false);
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={!loading && hasMore}
    >
      <PostList postPropsList={postList} isLoading={loading} />
    </InfiniteScroll>
  );
}
