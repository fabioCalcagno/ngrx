import { User } from './../model/user.model';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
    user:User
}

export const initialAuthState:AuthState = {
  user:undefined
};

export const metaReducers: MetaReducer<AuthState>[] =  !environment.production ? [] : [];

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, action)=>{
      return {
        user: action.user
      }
  }),
  on(AuthActions.logoutAction, (state, action)=>{
    return initialAuthState;
  })
);
