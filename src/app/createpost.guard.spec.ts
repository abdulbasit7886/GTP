import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createpostGuard } from './createpost.guard';

describe('createpostGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createpostGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
