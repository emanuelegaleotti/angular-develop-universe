import { Inject, Injectable } from '@angular/core'
import { Amplify } from 'aws-amplify'
import { signInWithRedirect, getCurrentUser, AuthUser, signOut, fetchAuthSession } from 'aws-amplify/auth'
import { from, map, Observable } from 'rxjs'
import { AuthenticatorService } from '@aws-amplify/ui-angular'

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  constructor (
    @Inject('auth') { userPoolId, userPoolClientId, redirectSignIn, redirectSignOut, domain }: {
      userPoolId: string,
      userPoolClientId: string,
      domain: string
      redirectSignIn: string[],
      redirectSignOut: string[]
    },
    private readonly authService: AuthenticatorService
  ) {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId,
          userPoolClientId,
          signUpVerificationMethod: 'code',
          loginWith: {
            oauth: {
              domain,
              scopes: ['email', 'openid'],
              redirectSignIn,
              redirectSignOut,
              responseType: 'code',
            }
          }
        }
      }
    })
  }

  checkLogin (): Observable<{
    tokens?: { [key: string]: any },
    credentials?: { [key: string]: any },
    identityId?: string,
    userSub?: string
  }> {
    return from(
      fetchAuthSession()
    )
  }

  login (): Observable<void> {
    return from(
      signInWithRedirect()
    )
  }

  getUser (): Observable<AuthUser> {
    return from(
      getCurrentUser()
    )
  }

  getRoles (): Observable<any> {
    return from(
      fetchAuthSession()
    ).pipe(
      map(s => s.tokens?.accessToken.payload['cognito:groups'] ?? [])
    )
  }

  logout (): Observable<void> {
    return from(
      signOut()
    )
  }
}


