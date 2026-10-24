import { ModuleWithProviders, NgModule } from '@angular/core'
import { CognitoService } from './cognito.service'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { COGNITO_KEY } from './state/ngu-cognito.selector'
import { CognitoEffects } from './state/effects'
import { CognitoReducers } from './state/reducers'
import { IsAuthenticatedDirective } from './directive/is-authenticated.directive'
import { IsNotAuthenticatedDirective } from './directive/is-not-authenticated.directive'
import { CheckRolesDirective } from './directive/check-roles.directive'


@NgModule({
  imports: [
    StoreModule.forFeature(COGNITO_KEY, CognitoReducers.cognitoReducer),
    EffectsModule.forFeature([CognitoEffects.CognitoEffects]),
    IsAuthenticatedDirective,
    IsNotAuthenticatedDirective,
    CheckRolesDirective
  ],
  exports: [
    IsAuthenticatedDirective,
    IsNotAuthenticatedDirective,
    CheckRolesDirective
  ]
})
export class NguCognitoModule {
  static forRoot (auth: {
    userPoolId: string,
    userPoolClientId: string,
    domain: string
    redirectSignIn: string[],
    redirectSignOut: string[]
  }): ModuleWithProviders<NguCognitoModule> {
    return {
      ngModule: NguCognitoModule,
      providers: [CognitoService, { provide: 'auth', useValue: auth }]
    }
  }
}
