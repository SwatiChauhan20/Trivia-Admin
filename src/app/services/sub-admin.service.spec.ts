import { TestBed } from '@angular/core/testing';

import { SubAdminService } from './sub-admin.service';

describe('SubAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubAdminService = TestBed.get(SubAdminService);
    expect(service).toBeTruthy();
  });
});
