import { AuthState } from './reducers/index';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey)


export const isLoggedIn = createSelector(
    // state=> state[authFeatureKey], using feature selector instead puxing state object
    selectAuthState,
    (authState)=> !!authState.user
)

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn=> !loggedIn
)