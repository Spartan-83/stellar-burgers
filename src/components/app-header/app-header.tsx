import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../services/selectors';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name || ''} />;
};
