import { TestBed } from '@angular/core/testing';

import { TractorStorageService } from './tractor-storage.service';

describe('TractorStorageService', () => {
  let service: TractorStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TractorStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
