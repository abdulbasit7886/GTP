import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { displayInfoGuard } from './display-info.guard';

describe('displayInfoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => displayInfoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
