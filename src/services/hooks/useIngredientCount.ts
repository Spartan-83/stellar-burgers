import { useMemo } from 'react';
import { useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from '../selectors';

export const useIngredientCount = (ingredientId: string): number => {
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);

  return useMemo(() => {
    let count = 0;

    if (bun && bun._id === ingredientId) {
      count = 2;
    }

    ingredients.forEach((ingredient) => {
      if (ingredient._id === ingredientId) {
        count++;
      }
    });

    return count;
  }, [bun, ingredients, ingredientId]);
};
