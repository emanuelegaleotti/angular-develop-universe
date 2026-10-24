import { TestBed } from '@angular/core/testing';

import { CognitoService } from 'src/lib/cognito.service';

describe('LorentzCognitoService', () => {
  let service: CognitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CognitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
