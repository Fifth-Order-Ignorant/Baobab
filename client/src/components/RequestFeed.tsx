import { RequestList } from './RequestList';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Request } from '../../../server/src/entities/request.entity';

type RequestFeedProps = {
  /**
   * Function used to fetch posts in batches.
   * @param page Batch number.
   */
  fetchRequests: (page: number) => Promise<Request[]>;
};

/**
 * Renders the infinite scrolling post feed.
 */
export default function RequestFeed(props: RequestFeedProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState<Request[]>([]);

  const [hasMore, setHasMore] = useState(true);

  const loadMore = async (page: number) => {
    setLoading(true);

    const newPosts = await props.fetchRequests(page);

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
      <RequestList postPropsList={postList} isLoading={loading} />
    </InfiniteScroll>
  );
}