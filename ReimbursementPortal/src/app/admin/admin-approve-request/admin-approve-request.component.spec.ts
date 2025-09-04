import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveRequestComponent } from './admin-approve-request.component';

describe('AdminApproveRequestComponent', () => {
  let component: AdminApproveRequestComponent;
  let fixture: ComponentFixture<AdminApproveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApproveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApproveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
