import {  createActionGroup, emptyProps, props } from '@ngrx/store'
import { AuthUser } from 'aws-amplify/auth'

export const CognitoActions = createActionGroup({
  source: 'USER',
  events: {
    'login': emptyProps(),
    'is_authenticated': emptyProps(),
    'is_not_authenticated': emptyProps(),
    'store_user': props<{ u: AuthUser }>(),
    'clear_user': emptyProps(),
    'store_roles': props<{ r: string[] }>(),
    'clear_roles': emptyProps(),
    'logout': emptyProps(),
  }
})

