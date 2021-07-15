import { RequestList } from './RequestList';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {RoleRequestResponse} from 'baobab-common';

type RequestFeedProps = {
  /**
   * Function used to fetch Requests in batches.
   * @param page Batch number.
   */
  fetchRequests: (page: number) => Promise<RoleRequestResponse[]>;
};

/**
 * Renders the infinite scrolling request feed.
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
      <RequestList requestPropsList={postList} isLoading={loading} />
    </InfiniteScroll>
  );
}