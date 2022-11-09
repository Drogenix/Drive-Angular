import { TestBed } from '@angular/core/testing';

import { UserDriveService } from './user-drive.service';

describe('UserDriveService', () => {
  let service: UserDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
