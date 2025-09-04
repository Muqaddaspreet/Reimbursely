import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpUpdateDataComponent } from './emp-update-data.component';

describe('EmpUpdateDataComponent', () => {
  let component: EmpUpdateDataComponent;
  let fixture: ComponentFixture<EmpUpdateDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpUpdateDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpUpdateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
