import { TestBed } from '@angular/core/testing';

import { EncriptDecriptServiceService } from './encript-decript-service.service';

describe('EncriptDecriptServiceService', () => {
  let service: EncriptDecriptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncriptDecriptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
