import ingredientsReducer, {
  fetchIngredients,
  IngredientsState,
} from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: null,
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Ingredient 1',
      type: 'bun',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 100,
      price: 200,
      image: 'test.png',
      image_mobile: 'test-mobile.png',
      image_large: 'test-large.png',
    },
    {
      _id: '2',
      name: 'Ingredient 2',
      type: 'main',
      proteins: 15,
      fat: 25,
      carbohydrates: 35,
      calories: 150,
      price: 300,
      image: 'test.png',
      image_mobile: 'test-mobile.png',
      image_large: 'test-large.png',
    },
  ];

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    };
    const state = ingredientsReducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.ingredients).toHaveLength(2);
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Test error' },
    };
    const state = ingredientsReducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Test error');
  });

  it('should handle fetchIngredients.rejected with default message', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: {},
    };
    const state = ingredientsReducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch ingredients');
  });
});
