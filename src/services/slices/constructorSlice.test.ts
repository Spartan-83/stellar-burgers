import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  ConstructorState,
} from './constructorSlice';
import { TIngredient } from '../../utils/types';

describe('constructorSlice', () => {
  const initialState: ConstructorState = {
    bun: null,
    ingredients: [],
  };

  const mockBun: TIngredient = {
    _id: '1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 100,
    price: 200,
    image: 'test.png',
    image_mobile: 'test-mobile.png',
    image_large: 'test-large.png',
  };

  const mockIngredient: TIngredient = {
    _id: '2',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 15,
    fat: 25,
    carbohydrates: 35,
    calories: 150,
    price: 300,
    image: 'test.png',
    image_mobile: 'test-mobile.png',
    image_large: 'test-large.png',
  };

  it('should handle addIngredient for bun', () => {
    const state = constructorReducer(initialState, addIngredient(mockBun));
    
    expect(state.bun).not.toBeNull();
    expect(state.bun?.name).toBe('Test Bun');
    expect(state.bun?.type).toBe('bun');
    expect(state.bun).toHaveProperty('id');
  });

  it('should handle addIngredient for regular ingredient', () => {
    const state = constructorReducer(initialState, addIngredient(mockIngredient));
    
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe('Test Ingredient');
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  it('should replace bun when adding new bun', () => {
    const stateWithBun = constructorReducer(initialState, addIngredient(mockBun));
    const newBun: TIngredient = { ...mockBun, _id: '3', name: 'New Bun' };
    const state = constructorReducer(stateWithBun, addIngredient(newBun));
    
    expect(state.bun?.name).toBe('New Bun');
    expect(state.bun?._id).toBe('3');
  });

  it('should handle removeIngredient', () => {
    // Добавляем ингредиент
    const stateWithIngredient = constructorReducer(initialState, addIngredient(mockIngredient));
    const ingredientId = stateWithIngredient.ingredients[0].id;
    
    // Удаляем его
    const state = constructorReducer(stateWithIngredient, removeIngredient(ingredientId));
    
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    // Добавляем несколько ингредиентов
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    const ingredient2: TIngredient = { ...mockIngredient, _id: '3', name: 'Ingredient 2' };
    state = constructorReducer(state, addIngredient(ingredient2));
    const ingredient3: TIngredient = { ...mockIngredient, _id: '4', name: 'Ingredient 3' };
    state = constructorReducer(state, addIngredient(ingredient3));
    
    // Перемещаем первый элемент на третью позицию
    const newState = constructorReducer(state, moveIngredient({ from: 0, to: 2 }));
    
    expect(newState.ingredients[0].name).toBe('Ingredient 2');
    expect(newState.ingredients[2].name).toBe('Test Ingredient');
  });

  it('should handle clearConstructor', () => {
    // Добавляем булку и ингредиенты
    let state = constructorReducer(initialState, addIngredient(mockBun));
    state = constructorReducer(state, addIngredient(mockIngredient));
    
    // Очищаем конструктор
    const newState = constructorReducer(state, clearConstructor());
    
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
