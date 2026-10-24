import { TestBed } from '@angular/core/testing';

import { AzureConfigService } from './azure-config.service';

describe('AzureConfigService', () => {
  let service: AzureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
