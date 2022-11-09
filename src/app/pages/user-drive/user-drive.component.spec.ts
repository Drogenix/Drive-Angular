import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDriveComponent } from './user-drive.component';

describe('UserDriveComponent', () => {
  let component: UserDriveComponent;
  let fixture: ComponentFixture<UserDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
