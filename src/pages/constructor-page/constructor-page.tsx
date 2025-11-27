import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIngredients,
  selectIngredientsError
} from '../../services/selectors';

import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '@components';

export const ConstructorPage: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const error = useSelector(selectIngredientsError);

  if (error) {
    return (
      <div className={styles.error}>
        <p className='text text_type_main-default'>
          Ошибка загрузки ингредиентов: {error}
        </p>
      </div>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
