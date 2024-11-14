import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { editpostGuard } from './editpost.guard';

describe('editpostGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => editpostGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
