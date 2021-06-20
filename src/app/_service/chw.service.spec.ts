import { TestBed } from '@angular/core/testing';

import { ChwService } from './chw.service';

describe('ChwService', () => {
  let service: ChwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
