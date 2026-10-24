import {Action, createReducer, on} from "@ngrx/store";
import { CognitoActions } from '../actions/cognito.actions'
import { AuthUser } from 'aws-amplify/auth'


export interface CognitoState {
  isAuthenticated: boolean
  user: AuthUser | null
  roles: string[]
}

const initialState: CognitoState = {
  isAuthenticated: false,
  user: null,
  roles: []
}

const reducer = createReducer(
  initialState,
  on(CognitoActions.is_authenticated, (state): CognitoState => ({...state, isAuthenticated: true})),
  on(CognitoActions.is_not_authenticated, (state): CognitoState => ({...state, isAuthenticated: false})),
  on(CognitoActions.store_user, (state, action): CognitoState => ({...state, user: action.u})),
  on(CognitoActions.clear_user, (state): CognitoState => ({...state, user: null})),
  on(CognitoActions.store_roles, (state, action): CognitoState => ({...state, roles: action.r})),
  on(CognitoActions.clear_roles, (state): CognitoState => ({...state, roles: []})),
)

export function cognitoReducer(state: CognitoState | undefined, action: Action): CognitoState {
  return reducer(state, action)
}
