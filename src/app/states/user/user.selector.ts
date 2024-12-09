import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

// selector for user object
export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

// selector for loading indicators or messages
export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

// selector for handle error
export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
