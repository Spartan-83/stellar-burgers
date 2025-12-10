import feedReducer, {
  fetchFeeds,
  FeedState,
} from './feedSlice';
import { TOrder } from '../../utils/types';

describe('feedSlice', () => {
  const initialState: FeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null,
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 12345,
      ingredients: ['1', '2'],
    },
  ];

  it('should handle fetchFeed.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeed.fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10,
      },
    };
    const state = feedReducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('should handle fetchFeed.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Feed error' },
    };
    const state = feedReducer(initialState, action);
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Feed error');
  });
});
