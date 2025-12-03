import orderReducer, {
  createOrder,
  fetchOrders,
  fetchOrderByNumber,
  clearOrder,
  OrderState,
} from './orderSlice';
import { TOrder } from '../../utils/types';

describe('orderSlice', () => {
  const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null,
  };

  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Test Order',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 12345,
    ingredients: ['1', '2', '3'],
  };

  describe('createOrder', () => {
    it('should handle createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);
      
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle createOrder.fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder,
      };
      const state = orderReducer(initialState, action);
      
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.currentOrder).toEqual(mockOrder);
    });

    it('should handle createOrder.rejected', () => {
      const action = {
        type: createOrder.rejected.type,
        error: { message: 'Test error' },
      };
      const state = orderReducer(initialState, action);
      
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('Test error');
    });
  });

  describe('fetchOrders', () => {
    it('should handle fetchOrders.pending', () => {
      const action = { type: fetchOrders.pending.type };
      const state = orderReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchOrders.fulfilled', () => {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: [mockOrder],
      };
      const state = orderReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual([mockOrder]);
      expect(state.orders).toHaveLength(1);
    });

    it('should handle fetchOrders.rejected', () => {
      const action = {
        type: fetchOrders.rejected.type,
        error: { message: 'Fetch orders error' },
      };
      const state = orderReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Fetch orders error');
    });
  });

  describe('fetchOrderByNumber', () => {
    it('should handle fetchOrderByNumber.pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchOrderByNumber.fulfilled', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder,
      };
      const state = orderReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.currentOrder).toEqual(mockOrder);
    });

    it('should handle fetchOrderByNumber.rejected', () => {
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: 'Order not found' },
      };
      const state = orderReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Order not found');
    });
  });

  describe('clearOrder', () => {
    it('should clear order data', () => {
      const stateWithOrder: OrderState = {
        ...initialState,
        currentOrder: mockOrder,
        orderModalData: mockOrder,
        error: 'Some error',
      };
      
      const state = orderReducer(stateWithOrder, clearOrder());
      
      expect(state.currentOrder).toBeNull();
      expect(state.orderModalData).toBeNull();
      expect(state.error).toBeNull();
    });
  });
});
