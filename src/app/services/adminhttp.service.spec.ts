import { TestBed } from '@angular/core/testing';

import { AdminhttpService } from './adminhttp.service';

describe('AdminhttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminhttpService = TestBed.get(AdminhttpService);
    expect(service).toBeTruthy();
  });
});
