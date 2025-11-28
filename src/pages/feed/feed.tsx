import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { selectFeedOrders, selectFeedLoading } from '../../services/selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const loading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (loading) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
