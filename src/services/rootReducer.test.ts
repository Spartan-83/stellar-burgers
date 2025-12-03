import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('should initialize with correct initial state', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();
    
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
  });

  it('should have correct initial state for all slices', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();
    
    // Проверяем начальное состояние ingredients
    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null,
    });
    
    // Проверяем начальное состояние burgerConstructor
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: [],
    });
    
    // Проверяем начальное состояние order
    expect(state.order).toEqual({
      orders: [],
      currentOrder: null,
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null,
    });
  });
});
