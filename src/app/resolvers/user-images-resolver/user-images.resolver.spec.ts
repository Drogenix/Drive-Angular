import { TestBed } from '@angular/core/testing';

import { UserImagesResolver } from './user-images.resolver';

describe('UserImagesResolver', () => {
  let resolver: UserImagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserImagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
