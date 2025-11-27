import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { fetchOrders } from '../../services/slices/orderSlice';
import { selectOrders, selectOrderLoading } from '../../services/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrderLoading);

  // Загружаем заказы пользователя при открытии страницы
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
