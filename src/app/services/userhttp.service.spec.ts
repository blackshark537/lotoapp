import { TestBed } from '@angular/core/testing';

import { UserhttpService } from './userhttp.service';

describe('UserhttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserhttpService = TestBed.get(UserhttpService);
    expect(service).toBeTruthy();
  });
});
