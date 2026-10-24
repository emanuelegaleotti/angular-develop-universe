import { createFeatureSelector } from "@ngrx/store"
import { CognitoReducers } from './reducers'

export const COGNITO_KEY = 'cognito-module'

export const selectCognitoModuleState = createFeatureSelector<CognitoReducers.CognitoState>(COGNITO_KEY)
