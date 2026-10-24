import {createSelector} from "@ngrx/store";
import { selectCognitoModuleState } from '../ngu-cognito.selector'
import { AuthUser } from 'aws-amplify/auth'
import { CognitoReducers } from '../reducers'


export const selectIsAuthenticated = createSelector(
  selectCognitoModuleState,
  (s: CognitoReducers.CognitoState): boolean => s.isAuthenticated
)
export const selectUser = createSelector(
  selectCognitoModuleState,
  (s: CognitoReducers.CognitoState): AuthUser | null => s.user
)
export const selectRoles = createSelector(
  selectCognitoModuleState,
  (s: CognitoReducers.CognitoState): string[] => s.roles
)

export const selectCheckRoles = (roles: string[], condition: 'AND' | 'OR') => createSelector(
  selectRoles,
  (r: string[]): boolean => {
    if (condition === 'AND') {
      return roles.map(role => r.includes(role)).every(b => b)
    } else {
      return roles.map(role => r.includes(role)).some(b => b)
    }
  }
)
