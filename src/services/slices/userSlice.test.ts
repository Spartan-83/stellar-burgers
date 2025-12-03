import userReducer, {
  fetchUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  UserState,
} from './userSlice';
import { TUser } from '../../utils/types';

describe('userSlice', () => {
  const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    isAuthChecked: false,
    loading: false,
    error: null,
  };

  const mockUser: TUser = {
    email: 'test@test.com',
    name: 'Test User',
  };

  describe('fetchUser', () => {
    it('should handle fetchUser.pending', () => {
      const action = { type: fetchUser.pending.type };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchUser.fulfilled', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: mockUser,
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle fetchUser.rejected', () => {
      const action = {
        type: fetchUser.rejected.type,
        error: { message: 'User fetch error' },
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('User fetch error');
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle fetchUser.rejected with default message', () => {
      const action = {
        type: fetchUser.rejected.type,
        error: {},
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch user');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('loginUser', () => {
    it('should handle loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser,
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Login error' },
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Login error');
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle loginUser.rejected with default message', () => {
      const action = {
        type: loginUser.rejected.type,
        error: {},
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Login failed');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('registerUser', () => {
    it('should handle registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser,
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Registration error' },
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Registration error');
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle registerUser.rejected with default message', () => {
      const action = {
        type: registerUser.rejected.type,
        error: {},
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Registration failed');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('should handle updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle updateUser.fulfilled', () => {
      const stateWithUser: UserState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
      };
      
      const updatedUser: TUser = {
        email: 'updated@test.com',
        name: 'Updated User',
      };
      
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser,
      };
      
      const state = userReducer(stateWithUser, action);
      
      expect(state.loading).toBe(false);
      expect(state.user).toEqual(updatedUser);
    });

    it('should handle updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Update error' },
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Update error');
    });

    it('should handle updateUser.rejected with default message', () => {
      const action = {
        type: updateUser.rejected.type,
        error: {},
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to update user');
    });
  });

  describe('logoutUser', () => {
    it('should handle logoutUser.pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle logoutUser.fulfilled', () => {
      const stateWithUser: UserState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
      };
      
      const action = { type: logoutUser.fulfilled.type };
      const state = userReducer(stateWithUser, action);
      
      expect(state.loading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it('should handle logoutUser.rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: 'Logout error' },
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Logout error');
    });

    it('should handle logoutUser.rejected with default message', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: {},
      };
      const state = userReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Logout failed');
    });
  });
});
